import * as XLSX from 'xlsx';

export class ExcelReader {

    static readExcel<T>(
        filePath: string,
        sheetName: string
    ): T[] {

        const workbook = XLSX.readFile(filePath);

        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {

           throw new Error(
                `Sheet "${sheetName}" not found in ${filePath}`
            );
        }

        return XLSX.utils.sheet_to_json<T>(
            worksheet,
            {
                defval: ''
            }
        );
    }
}