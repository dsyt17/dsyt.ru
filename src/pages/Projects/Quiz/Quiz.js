import { useState } from 'react';
import classes from './quiz.module.scss';

const questions = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

function Result({ goAgain, correct }) {
    return (
        <div className={classes.result}>
            {/*eslint-disable-next-line  */}
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
            <h2>{`Вы отгадали ${correct} ответа из ${questions.length}`}</h2>
            <button onClick={goAgain}>Попробовать снова</button>
        </div>
    );
}

function Game({ question, onClickVariant, step }) {
    return (
        <>
            <div className={classes.progress}>
                <div
                    style={{ width: `${Math.round((step / questions.length) * 100)}%` }}
                    className={classes.progress__inner}
                ></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((e, index) => (
                    <li
                        onClick={() => {
                            onClickVariant(index);
                        }}
                        key={e}
                    >
                        {e}
                    </li>
                ))}
            </ul>
        </>
    );
}

function App() {
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0);
    const question = questions[step];

    const onClickVariant = index => {
        setStep(step + 1);

        if (index === question.correct) setCorrect(correct + 1);
    };

    const goAgain = () => {
        setStep(0);
        setCorrect(0);
    };

    return (
        <div className={classes.quizbody}>
            <div className={classes.App}>
                {step !== questions.length ? (
                    <Game step={step} question={question} onClickVariant={onClickVariant} />
                ) : (
                    <Result goAgain={goAgain} correct={correct} />
                )}
            </div>
        </div>
    );
}

export default App;
