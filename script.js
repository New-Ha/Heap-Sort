const container = document.getElementById('container');
const numArr = [];
// 정렬할 숫자 배열을 만드는 함수
function createArray() {
    // 숫자 15개를 만들 예정
    for (let i = 0; i < 15; i++) {
        // 1~100 사이의 랜덤한 숫자
        let num = Math.ceil(Math.random() * 100);
        numArr.push(num);
        // 막대 그래프의 막대를 만드는 과정
        let stick = document.createElement('div');
        stick.classList.add('stick');
        // 랜덤 숫자에 따라 높이가 다른 막대를 생성
        stick.style.height = `${num * 3}px`;
        // 인덱스에 30을 곱해서 생성되는 막대들을 나열
        stick.style.transform = `translate(${i * 33}px)`;

        // 막대에 숫자를 표시하는 라벨을 붙여준다.
        let stickLabel = document.createElement('label');
        stickLabel.classList.add('stick_label');
        stickLabel.innerHTML = num;

        stick.appendChild(stickLabel);
        container.appendChild(stick);
    }
}

async function Heapify(arr, len, idx) {
    const sticks = document.querySelectorAll('.stick');
    let max = idx;
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;

    if (left < len && numArr[left] > numArr[max]) max = left;
    if (right < len && numArr[right] > numArr[max]) max = right;

    if (max !== idx) {
        [arr[idx], arr[max]] = [arr[max], arr[idx]];
        [sticks[idx].style.height, sticks[max].style.height] = [sticks[max].style.height, sticks[idx].style.height];
        [sticks[idx].childNodes[0].innerHTML, sticks[max].childNodes[0].innerHTML] = [
            sticks[max].childNodes[0].innerHTML,
            sticks[idx].childNodes[0].innerHTML,
        ];

        await new Promise(res =>
            setTimeout(() => {
                res();
            }, 250),
        );

        console.log(`정렬 중 👓 ${numArr}`);
        await Heapify(arr, len, max);
    }
}

async function HeapSort(arr, len) {
    const sticks = document.querySelectorAll('.stick');

    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        await Heapify(arr, len, i);
    }

    for (let i = len - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        [sticks[i].style.height, sticks[0].style.height] = [sticks[0].style.height, sticks[i].style.height];
        [sticks[i].childNodes[0].innerHTML, sticks[0].childNodes[0].innerHTML] = [
            sticks[0].childNodes[0].innerHTML,
            sticks[i].childNodes[0].innerHTML,
        ];

        await new Promise(res =>
            setTimeout(() => {
                res();
            }, 250),
        );

        await Heapify(arr, i, 0);
    }
    console.log(`정렬 끝❗️❗️ ${numArr}`);
}

//Calling
createArray();
console.log(`정렬 전 👉🏻 ${numArr}`);
HeapSort(numArr, 15);
