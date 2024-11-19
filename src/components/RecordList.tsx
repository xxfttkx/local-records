import React, { useState } from "react";
import { RecordContent } from "../utils/dataCollection";
import RecordDetails from "./RecordDetails"; // 引入详情组件
import "./RecordList.css";

interface RecordListProps {
  records: RecordContent[];
  onUpdate: (updatedRecord: RecordContent, index: number) => Promise<boolean>; // 更新记录的回调函数
}

const RecordList: React.FC<RecordListProps> = ({ records, onUpdate }) => {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedRecord(key);
  };

  return (
    <div className="records-list">
      {records.map((record, index) => (
        <div
          key={record.key}
          className={`record-item ${expandedRecord === record.key ? "expanded" : ""}`}
          onClick={() => toggleExpand(record.key)} // 点击整个 record-item 触发展开
        >
          <span>
            {record.key} - {record.value}
          </span>
          {expandedRecord === record.key && (
            <div onClick={(e) => e.stopPropagation() /* 防止点击内容时触发收起 */}>
              <RecordDetails
                record={record}
                onUpdate={onUpdate}
                onClose={() => toggleExpand("")}
                index = {index}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecordList;
