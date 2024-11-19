import { writeTextFile, readTextFile, BaseDirectory, exists } from '@tauri-apps/plugin-fs'
import { path } from '@tauri-apps/api';
import { invoke } from '@tauri-apps/api/core';


class RecordContent {
    public key: string;
    public value: string;
    public desc: string;
    constructor(key: string, value: string, desc: string) {
        this.key = key;
        this.value = value;
        this.desc = desc;
    }
}

class RecordManager {
    private dataPath: string = 'data.json';
    private records: RecordContent[] = [];
    public keysSet: Set<string> = new Set();  // 用 Set 来检查是否已经存在相同的 key

    hasKey(key: string) {
        return this.keysSet.has(key);
    }
    // 添加记录，防止重复的 key
    addRecord(record: RecordContent): boolean {
        invoke('log_string', { s: "Try Add Record." });
        if (!this.keysSet.has(record.key)) {
            this.records.push(record);
            this.keysSet.add(record.key);
            invoke('log_string', { s: "Add Record Succcessd." });
            this.saveToJson();
            return true;
        }
        else {
            invoke('log_string', { s: "Add Record Failed." });
            return false;
        }
    }

    // 更新记录
    async updateRecord(index: number, record: RecordContent): Promise<boolean> {
        if (index < this.records.length) {
            invoke('log_string', { s: "key: " + record.key + "-" + this.records[index].key + "||" + index+ "-" + this.records.length});
            if (record.key != this.records[index].key && this.hasKey(record.key)) {
                return false;
            }
            else {
                this.keysSet.delete(this.records[index].key);
                this.records.splice(index, 1);
                var res = await this.addRecord(record)
                return res;
            }
        }
        invoke('log_string', { s: "updateRecord false; index: " + index + "|" + this.records.length });
        return false;
    }

    getRecords(): RecordContent[] {
        return this.records;
    }

    // 将 records 保存到 JSON 文件
    async saveToJson() {
        invoke('log_string', { s: "try saveToJson |||  records_length: " + this.records.length });
        const data = JSON.stringify(this.records);
        try {
            await writeTextFile(this.dataPath, data, { baseDir: BaseDirectory.AppLocalData });
            invoke('log_string', { s: "Records saved successfully." });
        } catch (error) {
            invoke('log_string', { s: "Failed to save records:" + error });
        }
    }

    // 从 JSON 文件中加载 records
    async loadFromJson() {
        try {
            const s = await path.join(await path.appLocalDataDir(), this.dataPath);
            invoke('log_string', { s: 'path:' + s }).then();
            const fileExists = await exists(s, { baseDir: BaseDirectory.AppLocalData });
            if (!fileExists) {
                invoke('log_string', { s: 'fileExists = false' });
                // 如果文件不存在，则创建一个默认的空文件或初始化文件
                await this.saveToJson();  // 使用 saveData 来创建文件
                return;  // 返回
            }
            const data = await readTextFile(this.dataPath, { baseDir: BaseDirectory.AppLocalData });
            const parsed = JSON.parse(data) as RecordContent[];
            this.records = parsed;
            this.keysSet = new Set(parsed.map((record) => record.key)); // 更新 keysSet
            invoke('log_string', { s: "Records loaded successfully.  records_length: " + this.records.length });
            return this.records;
        } catch (error) {
            invoke('log_string', { s: "Failed to load records:" + error });
            return null;
        }
    }
}


export { RecordContent, RecordManager };