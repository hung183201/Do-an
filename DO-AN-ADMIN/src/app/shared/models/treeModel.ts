export class TreeNode {
  children?: TreeNode[];
  item: string;
  key: string;
}

/** Flat to-do item node with expandable and level information */
export class TreeFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  key: string;
}
