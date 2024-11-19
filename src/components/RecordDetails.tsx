import React, { useState } from "react";
import { RecordContent } from "../utils/dataCollection";
import "./RecordDetails.css";

interface RecordDetailsProps {
  record: RecordContent;
  onUpdate: (updatedRecord: RecordContent) => void;
  onClose: () => void;
}

const RecordDetails: React.FC<RecordDetailsProps> = ({ record, onUpdate, onClose }) => {
  const [key, setKey] = useState(record.key);
  const [value, setValue] = useState(record.value);
  const [desc, setDesc] = useState(record.desc);

  const handleUpdate = () => {
    const updatedRecord = new RecordContent(key, value, desc);
    onUpdate(updatedRecord);
    onClose();
  };

  return (
    <div className="record-details-modal">
      <div className="record-details-content">
        <h3>编辑记录</h3>
        <div>
          <label>Key:</label>
          <input value={key} onChange={(e) => setKey(e.target.value)} />
        </div>
        <div>
          <label>Value:</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
        </div>
        <button onClick={handleUpdate}>保存</button>
        <button onClick={onClose}>取消</button>
      </div>
    </div>
  );
};

export default RecordDetails;
