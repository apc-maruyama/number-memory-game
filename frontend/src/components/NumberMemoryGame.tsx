"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, Brain } from 'lucide-react';

const NumberMemoryGame = () => {
  const [number, setNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState('show');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const generateNumber = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  };

  const startNewRound = () => {
    const newNumber = generateNumber(level + 2);
    setNumber(newNumber);
    setUserInput('');
    setPhase('show');
    setTimeLeft(level + 2);
  };

  useEffect(() => {
    const newRound = () => {
      startNewRound();
    };
    newRound();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'show' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPhase('input');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, phase]);

  const checkAnswer = () => {
    if (userInput === number) {
      const newScore = score + level * 100;
      setScore(newScore);
      setHighScore(Math.max(newScore, highScore));
      setLevel((prev) => prev + 1);
      setPhase('result');
    } else {
      setScore(0);
      setLevel(1);
      setPhase('result');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phase === 'input') {
      checkAnswer();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg text-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Brain className="w-8 h-8" />
            数字記憶ゲーム
          </h1>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">レベル: {level}</div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="text-sm">ハイスコア: {highScore}</span>
            </div>
          </div>
          <div className="text-xl mb-2">スコア: {score}</div>
        </div>

        <div className="space-y-4">
          {phase === 'show' && (
            <div className="text-center">
              <div className="text-4xl font-mono mb-4 tracking-wider">{number}</div>
              <div className="text-xl">残り時間: {timeLeft}秒</div>
            </div>
          )}

          {phase === 'input' && (
            <div className="space-y-4">
              <Input
                type="number"
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="数字を入力してください"
                className="w-full text-center text-2xl font-mono tracking-wider h-12 bg-white text-black placeholder:text-gray-400"
                autoFocus
              />
              <Button 
                onClick={checkAnswer}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              >
                確認する
              </Button>
            </div>
          )}

          {phase === 'result' && (
            <div className="text-center space-y-4">
              <div className="text-xl">
                {userInput === number ? (
                  <div className="text-green-400">正解！次のレベルへ進みます！</div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-red-400">ゲームオーバー</div>
                    <div className="text-sm">正解の数字: {number}</div>
                  </div>
                )}
              </div>
              <Button 
                onClick={startNewRound}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              >
                {userInput === number ? '次のレベルへ' : 'もう一度挑戦'}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NumberMemoryGame; 