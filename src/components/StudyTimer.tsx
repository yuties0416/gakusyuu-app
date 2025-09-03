import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Clock } from 'lucide-react';

interface StudyTimerProps {
  onSessionComplete: (duration: number, subject: string) => void;
}

export function StudyTimer({ onSessionComplete }: StudyTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('数学');

  const subjects = ['数学', '英語', '国語', '理科', '社会', 'その他'];

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    if (seconds > 0) {
      onSessionComplete(Math.floor(seconds / 60), selectedSubject);
    }
    setSeconds(0);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">学習タイマー</h3>
        <div className="text-4xl font-mono font-bold text-blue-600 mb-4">
          {formatTime(seconds)}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          科目を選択
        </label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isRunning}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-center space-x-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play className="h-5 w-5" />
            <span>開始</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Pause className="h-5 w-5" />
            <span>一時停止</span>
          </button>
        )}
        
        <button
          onClick={handleStop}
          className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          disabled={seconds === 0}
        >
          <Square className="h-5 w-5" />
          <span>終了</span>
        </button>
      </div>

      {seconds > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-700">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              {selectedSubject}を{Math.floor(seconds / 60)}分間学習中
            </span>
          </div>
        </div>
      )}
    </div>
  );
}