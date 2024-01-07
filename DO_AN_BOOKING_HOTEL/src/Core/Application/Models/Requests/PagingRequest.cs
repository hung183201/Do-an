namespace Application.Models.Requests
{
    public class PagingRequest
    {
        public string FullTextSearch { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int TotalCount { get; set; }
        public int RowModify { get; set; }
    }
}
