import fs from "fs";
import csv from "csv-parser";

export interface VehicleImportRow {
  vehicleNo: string;
  chassisNo: string;
  makerName: string;
  makerClass: string;
  manufacturingDate: string;
  registrationDate: string;
  motorClass: string;
  ownerName: string;
  financier: string;
  phoneNumber: string;
}

class ImportService {
  async parseCSV(filePath: string): Promise<VehicleImportRow[]> {
    return new Promise((resolve, reject) => {
      const rows: VehicleImportRow[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          rows.push({
            vehicleNo: row["VEHICLE NO"] ?? "",
            chassisNo: row["CHASIS NUM"] ?? "",
            makerName: row["MAKER NAME"] ?? "",
            makerClass: row["MAKER CLASS"] ?? "",
            manufacturingDate: row["Mfg. Year"] ?? "",
            registrationDate: row["Date of Registration"] ?? "",
            motorClass: row["Motor Class"] ?? "",
            ownerName: row["OWNER NAME"] ?? "",
            financier: row["Financier"] ?? "",
            phoneNumber: row["Phone number"] ?? "",
          });
        })
        .on("end", () => {
          resolve(rows);
        })
        .on("error", reject);
    });
  }
}

export default new ImportService();