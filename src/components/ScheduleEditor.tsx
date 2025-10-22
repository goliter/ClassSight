import React, { useState } from "react";
import { Calendar, Clock, MapPin, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

export interface ScheduleItem {
  date: string;
  time: string;
  location: string;
}

interface ScheduleEditorProps {
  initialSchedule: ScheduleItem[];
  onScheduleChange: (schedule: ScheduleItem[]) => void;
}

const ScheduleEditor: React.FC<ScheduleEditorProps> = ({
  initialSchedule,
  onScheduleChange,
}) => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(
    initialSchedule || [{ date: new Date().toISOString().split("T")[0], time: "09:00-10:40", location: "" }]
  );
  // 批量添加相关状态
  const [batchStartDate, setBatchStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [batchCount, setBatchCount] = useState(3);
  const [batchInterval, setBatchInterval] = useState(2); // 间隔天数

  const addNewSchedule = () => {
    const today = new Date().toISOString().split("T")[0];
    const newItem: ScheduleItem = {
      date: today,
      time: "09:00-10:40",
      location: "",
    };
    const updatedSchedule = [...schedule, newItem];
    setSchedule(updatedSchedule);
    onScheduleChange(updatedSchedule);
  };

  const removeSchedule = (index: number) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(updatedSchedule);
    onScheduleChange(updatedSchedule);
  };

  const updateScheduleItem = (
    index: number,
    field: keyof ScheduleItem,
    value: string
  ) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setSchedule(updatedSchedule);
    onScheduleChange(updatedSchedule);
  };

  // 批量添加日期功能
  const addBatchSchedule = () => {
    if (!batchStartDate) return;
    
    const startDate = new Date(batchStartDate);
    const newItems: ScheduleItem[] = [];
    
    for (let i = 0; i < batchCount; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i * batchInterval);
      
      newItems.push({
        date: currentDate.toISOString().split("T")[0],
        time: "09:00-10:40",
        location: ""
      });
    }
    
    const updatedSchedule = [...schedule, ...newItems];
    setSchedule(updatedSchedule);
    onScheduleChange(updatedSchedule);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">课程安排</h3>

      {/* 批量添加日期功能 */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium">批量添加日期</h4>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="batch-start-date">开始日期</Label>
            <Input
              id="batch-start-date"
              type="date"
              value={batchStartDate}
              onChange={(e) => setBatchStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="batch-count">数量</Label>
            <Input
              id="batch-count"
              type="number"
              min="1"
              max="20"
              value={batchCount}
              onChange={(e) => setBatchCount(Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="batch-interval">间隔天数</Label>
            <Input
              id="batch-interval"
              type="number"
              min="1"
              max="7"
              value={batchInterval}
              onChange={(e) => setBatchInterval(Number(e.target.value))}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addBatchSchedule}>添加</Button>
          </div>
        </div>
      </div>

      <Separator />

      {schedule.map((item, index) => (
        <Card key={index} className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Label htmlFor={`date-${index}`}>日期</Label>
              </div>
              <Input
                id={`date-${index}`}
                type="date"
                value={item.date}
                onChange={(e) =>
                  updateScheduleItem(index, "date", e.target.value)
                }
                className="w-full"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <Label htmlFor={`time-${index}`}>时间</Label>
              </div>
              <Input
                id={`time-${index}`}
                type="text"
                value={item.time}
                onChange={(e) =>
                  updateScheduleItem(index, "time", e.target.value)
                }
                placeholder="例如: 09:00-10:40"
                className="w-full"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <Label htmlFor={`location-${index}`}>地点</Label>
              </div>
              <Input
                id={`location-${index}`}
                type="text"
                value={item.location}
                onChange={(e) =>
                  updateScheduleItem(index, "location", e.target.value)
                }
                placeholder="例如: 主教学楼A301"
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeSchedule(index)}
                disabled={schedule.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <Button
        variant="secondary"
        onClick={addNewSchedule}
        className="w-full flex items-center justify-center gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        添加课程安排
      </Button>
    </div>
  );
};

export default ScheduleEditor;
