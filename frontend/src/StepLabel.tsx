import { useState, useEffect } from 'react';

export function StepLabel(): JSX.Element {

	const [stepLabel, setStepLabel] = useState('');

	useEffect(() => {
        function blinkForAWhile(): boolean {
            let blink = '';
            let i = 1;
            let auxBlink = false;

            const blinkInterval = setInterval(() => {
                if (i > 6)
                    clearInterval(blinkInterval);
                
                setStepLabel(blink);

                blink = auxBlink ? '' : '.';
                i++;
                auxBlink = !auxBlink;
            }, 500);

            return true;
        }

        function writeText(): void {
            let msg = "Welcome to my new project with React.js, ASP.NET Core WebAPI and TypeScript!";
            let i = 0;

            const myInterval = setInterval(() => {
                if (i === msg.length)
                    clearInterval(myInterval);
                
                let finalMsg = msg.substring(0, i);
                setStepLabel(finalMsg);
                i++;
            }, 50);
        }

        function loadStepLabel(): void {
            blinkForAWhile();
            setTimeout(writeText, 4000);
        }
        
        loadStepLabel();
	}, []);

	return (
		<p>&nbsp;{stepLabel}</p>
	)
}