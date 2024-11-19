import { useEffect, useState } from "react";
import "./App.css";
import { RecordContent, RecordManager } from "./utils/dataCollection"; // 引入 Record 组件和 RecordContent
import AddRecord from "./components/AddRecord";
import RecordList from "./components/RecordList"; // 导入 RecordList 组件
import { path } from "@tauri-apps/api";
import { invoke } from '@tauri-apps/api/core';



const App: React.FC = () => {
  const [recordManager] = useState(() => new RecordManager()); // 只创建一次 RecordManager 实例
  //  const recordManager = new RecordManager();
  const [key, setKey] = useState("");
  const [records, setRecords] = useState<RecordContent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 加载数据
  useEffect(() => {
    path.appLocalDataDir().then((dir) => {
      invoke('log_string', { s: 'App Local Data Directory:' + dir }).then();
      recordManager.loadFromJson().then((data)=>{setRecords(data??[]);invoke('log_string',{s: 'useEffect || recordManager: '+ recordManager.getRecords().length});}); // 从 JSON 文件加载数据
      
    }).catch((error) => {
      invoke('log_string',{s: 'Error fetching app local data directory:' + error});
    });
  }, []); // 只加载一次

  // 保存数据
  const saveRecords = async () => {
    await recordManager.saveToJson(); // 将记录保存到 JSON 文件
  };

  // 添加新记录的处理函数
  const handleAddRecord = async (newRecord: RecordContent):Promise<boolean> => {
    // await recordManager.loadFromJson(); // 必要，为什么
    invoke('log_string',{s: 'handleAddRecord || curr_records_length: '+ records.length});
    invoke('log_string',{s: 'handleAddRecord || recordManager: '+ recordManager.getRecords().length});
    if(recordManager.addRecord(newRecord)){
      setRecords(recordManager.getRecords());
      return true;
    }
    return false;
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };


  async function search() {
    invoke('log_string',{s: key});
    // setGreetMsg(await invoke("greet", { name }));
  }

   // 修改记录
  const handleUpdateRecord = (updatedRecord: RecordContent) => {
    invoke('log_string',{s: 'handleUpdateRecord'});
    recordManager.updateRecord(updatedRecord.key, updatedRecord.value); // 使用 RecordManager 更新记录
    const updatedRecords = records.map((record) =>
      record.key === updatedRecord.key ? updatedRecord : record
    );
    setRecords(updatedRecords);
    saveRecords(); // 保存到本地
  };

  return (
    <main className="container">

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setKey(e.currentTarget.value)}
          placeholder="Enter a key..."
        />
        <button type="submit">Search</button>
      </form>
      
      <RecordList
        records={records}
        onUpdate={ handleUpdateRecord } // 传递修改记录的回调
      />

      {isModalOpen && (
        <AddRecord
          onTryAdd={handleAddRecord}
          onClose={toggleModal}
        />
      )}

      <button className="add-button" onClick={toggleModal}>
        +
      </button>
    </main>
  );
}

export default App;
