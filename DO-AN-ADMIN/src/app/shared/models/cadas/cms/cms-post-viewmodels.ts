import { CategoriesViewModel } from "../storage/categories-viewmodel";
import { TagsViewModel } from "../storage/tags-viewmodel";

export class BaiVietViewModel {
  id: string;
  postTitle: string;
  postStatus: string;
  author: string | undefined;
  authorId: string | undefined;
  categories: CategoriesViewModel[];
  tags: TagsViewModel[];
  modifiedAt: string;
  postDate: string;
}
