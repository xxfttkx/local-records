import React, { useState } from "react";
import { RecordContent } from "../utils/dataCollection";
import RecordDetails from "./RecordDetails"; // 引入详情组件
import "./RecordList.css";

interface RecordListProps {
  records: RecordContent[];
  onUpdate: (updatedRecord: RecordContent) => void; // 更新记录的回调函数
}

const RecordList: React.FC<RecordListProps> = ({ records, onUpdate }) => {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedRecord(expandedRecord === key ? null : key);
  };

  return (
    <div className="records-list">
      {records.map((record) => (
        <div key={record.key} className="record-item">
          <span onClick={() => toggleExpand(record.key)}>
            {record.key} - {record.value}
          </span>
          <div className="record-actions">
            <button onClick={() => toggleExpand(record.key)}>
              {expandedRecord === record.key ? "收起" : "展开"}
            </button>
          </div>
          {expandedRecord === record.key && (
            <RecordDetails
              record={record}
              onUpdate={onUpdate}
              onClose={() => toggleExpand(record.key)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RecordList;
