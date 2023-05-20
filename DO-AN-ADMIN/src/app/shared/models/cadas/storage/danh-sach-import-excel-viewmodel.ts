export interface ImportExcelStatusViewModel {
    Id?: string,
    XaId: string,
    FileName: string,
    ImportType: number,
    ImportStatus: boolean,
    ErrorMessage: string,
    FileStatus: number,
    PartitionMaTinh: number,
    CreatedAt:  Date | null,
    CreatedBy?: string,
    ModifiedAt:  Date | null;
    ModifiedBy?: string,
}

export class InputSearchDSImportExcel{
    fileName: string;
    xaId: string;
    fileStatus: number;
    importType:number ;
    importStatus: boolean;
    pageSize: number;
    PageNumber: number;
}

export class ImportTaiLieuKemTheoHSDC{
    file: any;
    xaId: string;
    isDelete :boolean;
    isSkip: boolean;
    isImportWithFileScan:boolean;
    serverFolderUploadPath:string
    
}