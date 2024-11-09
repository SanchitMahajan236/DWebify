"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DeveloperTools() {
  const [code, setCode] = useState(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>
        body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f0f0; }
        .calculator { background: #333; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.3); }
        .display { background: #fff; padding: 10px; margin-bottom: 10px; text-align: right; font-size: 24px; border-radius: 5px; }
        .buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
        button { padding: 15px; font-size: 18px; border: none; background: #444; color: white; cursor: pointer; border-radius: 5px; }
        button:hover { background: #555; }
        .operator { background: #ff9500; }
        .equals { background: #2196f3; }
    </style>
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="buttons">
            <button onclick="clearDisplay()">C</button>
            <button onclick="appendNumber('7')">7</button>
            <button onclick="appendNumber('8')">8</button>
            <button onclick="appendNumber('9')">9</button>
            <button class="operator" onclick="setOperator('+')">+</button>
            <button onclick="appendNumber('4')">4</button>
            <button onclick="appendNumber('5')">5</button>
            <button onclick="appendNumber('6')">6</button>
            <button class="operator" onclick="setOperator('-')">-</button>
            <button onclick="appendNumber('1')">1</button>
            <button onclick="appendNumber('2')">2</button>
            <button onclick="appendNumber('3')">3</button>
            <button class="operator" onclick="setOperator('*')">×</button>
            <button onclick="appendNumber('0')">0</button>
            <button onclick="appendNumber('.')">.</button>
            <button class="equals" onclick="calculate()">=</button>
            <button class="operator" onclick="setOperator('/')">÷</button>
        </div>
    </div>

    <script>
        let displayValue = '0';
        let firstOperand = null;
        let operator = null;
        let waitingForSecondOperand = false;

        const display = document.getElementById('display');

        function updateDisplay() {
            display.textContent = displayValue;
        }

        function appendNumber(number) {
            if (waitingForSecondOperand) {
                displayValue = number;
                waitingForSecondOperand = false;
            } else {
                displayValue = displayValue === '0' ? number : displayValue + number;
            }
            updateDisplay();
        }

        function clearDisplay() {
            displayValue = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }

        function setOperator(nextOperator) {
            const inputValue = parseFloat(displayValue);

            if (firstOperand === null) {
                firstOperand = inputValue;
            } else if (operator) {
                const result = calculate();
                displayValue = String(result);
                firstOperand = result;
            }

            waitingForSecondOperand = true;
            operator = nextOperator;
            updateDisplay();
        }

        function calculate() {
            if (operator === null || waitingForSecondOperand) return;

            const secondOperand = parseFloat(displayValue);
            let result;

            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
                    break;
                default:
                    return;
            }

            displayValue = String(result);
            firstOperand = result;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    </script>
</body>
</html>
`);

  const [livePreview, setLivePreview] = useState(code);

  useEffect(() => {
    setLivePreview(code);
  }, [code]);


  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Deploy Your Website on Smart Contracts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              Coming Soon
            </span>
          </div>
          {/* <CardHeader>
            <CardTitle>Smart Contract Deployment</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-background p-4 rounded-md opacity-50">
              <code>$ http3 deploy ./my-website</code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground opacity-50">
              Deploy your website directly to the blockchain using our CLI tool.
            </p>
          </CardContent> */}
        </Card>
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>Instant Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-background p-4 rounded-md">
              <code>Preview: https://ba..ipfs.link/</code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground">
              Get an instant preview link to share your deployed website.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>Web3 Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background p-4 rounded-md text-center">
              Smart Contract Interaction
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Easily integrate Web3 functionality into your deployed website.
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="editor" className="space-y-4">
            <TabsList>
              <TabsTrigger value="editor">Code Editor</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="code-editor" className="text-lg">
                    Code Editor
                  </Label>
                  <Textarea
                    id="code-editor"
                    placeholder="Enter your HTML/CSS/JavaScript code here"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setLivePreview(e.target.value);
                    }}
                    className="min-h-[400px] font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="live-preview" className="text-lg">
                    Live Preview
                  </Label>
                  <div className="border rounded-lg overflow-hidden h-[400px] bg-white">
                    <iframe
                      id="live-preview"
                      srcDoc={livePreview}
                      className="w-full h-full"
                      title="Live Preview"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="github">
              <Input
                placeholder="Enter GitHub repository URL"
                // value={githubUrl}
                // onChange={(e) => setGithubUrl(e.target.value)}
                className="mb-4"
              />
            </TabsContent>
          </Tabs>
          <div className="mt-6">
            
          </div>
        </CardContent>
      </Card>
      
    </section>
  );
}