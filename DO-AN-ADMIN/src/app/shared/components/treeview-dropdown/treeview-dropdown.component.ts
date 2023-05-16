import { TreeViewCheckListService } from './../../services/treeview-checklist-service';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TreeFlatNode, TreeNode } from '@app/shared/models/treeModel';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-treeview-dropdown',
  templateUrl: './treeview-dropdown.component.html',
  styleUrls: ['./treeview-dropdown.component.scss']
})
export class TreeViewDropdownComponent implements OnInit, OnChanges {

  @Input() treeData: TreeNode[];
  @Input() isMultipleSelect: boolean = false;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  // HANDLE CÂY ĐVHC
  flatNodeMap = new Map<TreeFlatNode, TreeNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TreeNode, TreeFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TreeFlatNode | null = null;

  /** The new item's name */
  newItemName = "";

  treeControl: FlatTreeControl<TreeFlatNode>;

  treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;

  dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<TreeFlatNode>(true /* multiple */);
  private _database: TreeViewCheckListService;

  @Input() itemSelect: string;
  @Output() listSelectionEvent = new EventEmitter<any>();
  /// Filtering
  constructor() {

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TreeFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if (changes.itemSelect && changes.itemSelect.currentValue) {

      let nodeFind = this.FindItem(this.treeData, changes.itemSelect.currentValue);
      if (nodeFind != null || nodeFind != undefined) {
        this.selectOneNode({ key: nodeFind.key, item: nodeFind.item } as TreeFlatNode);
      }
    }

  }

  ngOnInit(): void {
    this._database = new TreeViewCheckListService(this.treeData);

    this._database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TreeFlatNode) => node.level;

  isExpandable = (node: TreeFlatNode) => node.expandable;

  getChildren = (node: TreeNode): TreeNode[] => node.children;

  hasChild = (_: number, _nodeData: TreeFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TreeFlatNode) => _nodeData.item === "";

  FindItem = (array: TreeNode[], id) => {
    // for (const item of array) {
    //   const result = item.key === id ? item : this.FindItem(item.children, id);
    //   if (result) return result;
    // }
    const stack = [array[0]];
    while (stack.length) {
      const node = stack[false ? 'pop' : 'shift']();
      if (node.key === id) return node;
      node.children && stack.push(...node.children);
    }
    return null;
  };

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new TreeFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.key = node.key;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TreeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  clear() {
    this.checklistSelection.clear();
  }

  selectOneNode(node: TreeFlatNode) {
    this.checklistSelection.clear();
    this.checklistSelection.select(node);
    if (this.autocomplete) {
      this.autocomplete.closePanel();
    }

    this.listSelectionEvent.emit(this.checklistSelection.selected);
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TreeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TreeFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TreeFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TreeFlatNode): void {
    let parent: TreeFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TreeFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TreeFlatNode): TreeFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  getSelectedItems(): string {
    if (!this.checklistSelection.selected.length) return "";
    return this.checklistSelection.selected.map(s => s.item).join(",");
  }

  getSelectedItemsKey(): string[] {
    if (!this.checklistSelection.selected.length) return [];
    return this.checklistSelection.selected.map(s => s.key);
  }

  filterChanged(filterText: string) {
    // ChecklistDatabase.filter method which actually filters the tree and gives back a tree structure
    this._database.filter(filterText);
    if (filterText) {
      this.treeControl.expandAll();
    } else {
      this.treeControl.collapseAll();
    }
  }
}
