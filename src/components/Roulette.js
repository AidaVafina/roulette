import React, { useEffect, useState } from 'react';
import '../styles/Roulette.css';

const elements = [
    { color: 'red', rating: 1 },
    { color: 'yellow', rating: 2 },
    { color: 'green', rating: 3 },
    { color: 'blue', rating: 4 },
    { color: 'grey', rating: 5 },
    { color: 'black', rating: 6 },
    { color: 'purple', rating: 7 },
];

// функция для создания взвешенного массива элементов (по рейтингу)
const getWeightedElements = (items) => {
    const weightedArray = [];
    items.forEach(item => {
        for (let i = 0; i < item.rating; i++) {
            weightedArray.push(item);
        }
    });
    return weightedArray;
};

const Roulette = () => {
    const [spinning, setSpinning] = useState(false);  // состояние вращения
    const [currentElements, setCurrentElements] = useState([]);  // текущие элементы рулетки
    const [finalElement, setFinalElement] = useState(null);  // элемент, на котором остановится рулетка
    const spinTime = 5000; // время вращения (в миллисекундах)

    useEffect(() => {
        const weightedElements = getWeightedElements(elements);

        if (spinning) {
            // вращение рулетки каждые 100 мс
            const interval = setInterval(() => {
                setCurrentElements(() => {
                    const randomElements = [];
                    for (let i = 0; i < 5; i++) {
                        const randomIndex = Math.floor(Math.random() * weightedElements.length);
                        randomElements.push(weightedElements[randomIndex]);
                    }
                    return randomElements;
                });
            }, 100);

            // остановка вращения
            setTimeout(() => {
                clearInterval(interval);
                const randomIndex = Math.floor(Math.random() * weightedElements.length);
                setFinalElement(weightedElements[randomIndex]);  // выбор финального элемента
                setSpinning(false);
            }, spinTime);
        }
    }, [spinning]);

    return (
        <div className="roulette-container">
            <div className="roulette">
                {spinning ? (
                    currentElements.map((element, index) => (
                        <div key={index} className="roulette-item" style={{ backgroundColor: element.color }}>
                            {element.color}
                        </div>
                    ))
                ) : (
                    <div className="roulette-item final" style={{ backgroundColor: finalElement?.color }}>
                        {finalElement?.color}
                    </div>
                )}
            </div>
            <div className="pointer">🔻</div>
            <button onClick={() => setSpinning(true)} disabled={spinning}>
                Запустить рулетку
            </button>
        </div>
    );
};

export default Roulette;
