import React, { useState } from "react";
import { RecordContent } from "../utils/dataCollection";
import "./AddRecord.css";

interface AddRecordProps {
  onTryAdd: (newRecord: RecordContent) => Promise<boolean>;
  onClose: () => void; // 用于关闭弹窗
}

const AddRecord: React.FC<AddRecordProps> = ({ onTryAdd, onClose }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key || !value) {
      alert("Key 和 Value 不能为空！");
      return;
    }
    const newRecord = new RecordContent(key, value, desc);
    const res = await onTryAdd(newRecord)
    res ? onClose() : null;  // 使用三元表达式
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>添加新记录</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Key:
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Value:
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </label>
          </div>
          <button type="button" onClick={onClose}>取消</button>
          <button type="submit">添加记录</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecord;
