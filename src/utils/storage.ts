// import { writeTextFile, readTextFile, BaseDirectory, exists } from '@tauri-apps/plugin-fs'

// // 保存数据到文件
// export async function saveData(fileName: string, data: object): Promise<void> {
//   try {
//     const contents = JSON.stringify(data);
//     await writeTextFile(fileName, contents, {baseDir: BaseDirectory.AppConfig});
//     console.log("Data saved!");
//   } catch (error) {
//     console.error("Failed to save data:", error);
//   }
// }

// // 从文件读取数据
// export async function loadData(fileName: string): Promise<object | null> {
//   try {
//     // 检查文件是否存在
//     const fileExists = await exists(fileName, { baseDir: BaseDirectory.AppConfig });
    
//     if (!fileExists) {
//       // 如果文件不存在，则创建一个默认的空文件或初始化文件
//       const defaultData = {}; // 默认数据
//       await saveData(fileName, defaultData);  // 使用 saveData 来创建文件
//       return defaultData;  // 返回默认数据
//     }
//     const content = await readTextFile(fileName, { baseDir: BaseDirectory.AppConfig });
//     return JSON.parse(content);
//   } catch (error) {
//     console.error("Failed to load data:", error);
//     return null;  // 返回 null 如果加载失败
//   }
// }
