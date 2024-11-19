import { RecordContent } from "../utils/dataCollection"; // 引入 Record 组件和 RecordContent
import "./Record.css";

interface RecordProps {
    record: RecordContent;
  }
export default function Record({ record }: RecordProps){
    return <div  className="record-container">
    <h3>Key: {record.key}</h3>
    <p>Value: {record.value}</p>
    <p>Description: {record.desc}</p>
  </div>;
}