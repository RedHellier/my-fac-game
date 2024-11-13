const canvas = document.getElementById("game-space");
const ctx = canvas.getContext("2d");

let dx, dy, dxStored, dyStored, gridX, gridY, adjustment, snake, ghosts, food, powers, powered;
let gameRunning = false;

const growth = 3;
const powerTime = 200;
const chaseTime = 500;
const scatterTime = 170;
const gameSpeed = 40;

let score;
let ghostsEaten;
let foodEaten;

/**
 * @typedef Sprite
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {"horz"|"vert"|"bottomToLeft"|"bottomToRight"|"topToLeft"|"topToRight"|"head"|"body"|"tail"} drawType
 */

const walls = [
    //Row 0
    {x:0,y:0,drawType:"bottomToRight"},
    {x:1,y:0,drawType:"horz"},
    {x:2,y:0,drawType:"horz"},
    {x:3,y:0,drawType:"horz"},
    {x:4,y:0,drawType:"horz"},
    {x:5,y:0,drawType:"horz"},
    {x:6,y:0,drawType:"horz"},
    {x:7,y:0,drawType:"horz"},
    {x:8,y:0,drawType:"horz"},
    {x:9,y:0,drawType:"horz"},
    {x:10,y:0,drawType:"horz"},
    {x:11,y:0,drawType:"horz"},
    {x:12,y:0,drawType:"horz"},
    {x:13,y:0,drawType:"bottomToLeft"},
    {x:14,y:0,drawType:"bottomToRight"},
    {x:15,y:0,drawType:"horz"},
    {x:16,y:0,drawType:"horz"},
    {x:17,y:0,drawType:"horz"},
    {x:18,y:0,drawType:"horz"},
    {x:19,y:0,drawType:"horz"},
    {x:20,y:0,drawType:"horz"},
    {x:21,y:0,drawType:"horz"},
    {x:22,y:0,drawType:"horz"},
    {x:23,y:0,drawType:"horz"},
    {x:24,y:0,drawType:"horz"},
    {x:25,y:0,drawType:"horz"},
    {x:26,y:0,drawType:"horz"},
    {x:27,y:0,drawType:"bottomToLeft"},
    //Row 1
    {x:0,y:1,drawType:"vert"},
    {x:13,y:1,drawType:"vert"},
    {x:14,y:1,drawType:"vert"},
    {x:27,y:1,drawType:"vert"},
    //Row 2
    {x:0,y:2,drawType:"vert"},
    {x:2,y:2,drawType:"bottomToRight"},
    {x:3,y:2,drawType:"horz"},
    {x:4,y:2,drawType:"horz"},
    {x:5,y:2,drawType:"bottomToLeft"},
    {x:7,y:2,drawType:"bottomToRight"},
    {x:8,y:2,drawType:"horz"},
    {x:9,y:2,drawType:"horz"},
    {x:10,y:2,drawType:"horz"},
    {x:11,y:2,drawType:"bottomToLeft"},
    {x:13,y:2,drawType:"vert"},
    {x:14,y:2,drawType:"vert"},
    {x:16,y:2,drawType:"bottomToRight"},
    {x:17,y:2,drawType:"horz"},
    {x:18,y:2,drawType:"horz"},
    {x:19,y:2,drawType:"horz"},
    {x:20,y:2,drawType:"bottomToLeft"},
    {x:22,y:2,drawType:"bottomToRight"},
    {x:23,y:2,drawType:"horz"},
    {x:24,y:2,drawType:"horz"},
    {x:25,y:2,drawType:"bottomToLeft"},
    {x:27,y:2,drawType:"vert"},
    //Row 3
    {x:0,y:3,drawType:"vert"},
    {x:2,y:3,drawType:"vert"},
    {x:5,y:3,drawType:"vert"},
    {x:7,y:3,drawType:"vert"},
    {x:11,y:3,drawType:"vert"},
    {x:13,y:3,drawType:"vert"},
    {x:14,y:3,drawType:"vert"},
    {x:16,y:3,drawType:"vert"},
    {x:20,y:3,drawType:"vert"},
    {x:22,y:3,drawType:"vert"},
    {x:25,y:3,drawType:"vert"},
    {x:27,y:3,drawType:"vert"},
    //Row 4
    {x:0,y:4,drawType:"vert"},
    {x:2,y:4,drawType:"topToRight"},
    {x:3,y:4,drawType:"horz"},
    {x:4,y:4,drawType:"horz"},
    {x:5,y:4,drawType:"topToLeft"},
    {x:7,y:4,drawType:"topToRight"},
    {x:8,y:4,drawType:"horz"},
    {x:9,y:4,drawType:"horz"},
    {x:10,y:4,drawType:"horz"},
    {x:11,y:4,drawType:"topToLeft"},
    {x:13,y:4,drawType:"topToRight"},
    {x:14,y:4,drawType:"topToLeft"},
    {x:16,y:4,drawType:"topToRight"},
    {x:17,y:4,drawType:"horz"},
    {x:18,y:4,drawType:"horz"},
    {x:19,y:4,drawType:"horz"},
    {x:20,y:4,drawType:"topToLeft"},
    {x:22,y:4,drawType:"topToRight"},
    {x:23,y:4,drawType:"horz"},
    {x:24,y:4,drawType:"horz"},
    {x:25,y:4,drawType:"topToLeft"},
    {x:27,y:4,drawType:"vert"},
    //Row 5
    {x:0,y:5,drawType:"vert"},
    {x:27,y:5,drawType:"vert"},
    //Row 6
    {x:0,y:6,drawType:"vert"},
    {x:2,y:6,drawType:"bottomToRight"},
    {x:3,y:6,drawType:"horz"},
    {x:4,y:6,drawType:"horz"},
    {x:5,y:6,drawType:"bottomToLeft"},
    {x:7,y:6,drawType:"bottomToRight"},
    {x:8,y:6,drawType:"bottomToLeft"},
    {x:10,y:6,drawType:"bottomToRight"},
    {x:11,y:6,drawType:"horz"},
    {x:12,y:6,drawType:"horz"},
    {x:13,y:6,drawType:"horz"},
    {x:14,y:6,drawType:"horz"},
    {x:15,y:6,drawType:"horz"},
    {x:16,y:6,drawType:"horz"},
    {x:17,y:6,drawType:"bottomToLeft"},
    {x:19,y:6,drawType:"bottomToRight"},
    {x:20,y:6,drawType:"bottomToLeft"},
    {x:22,y:6,drawType:"bottomToRight"},
    {x:23,y:6,drawType:"horz"},
    {x:24,y:6,drawType:"horz"},
    {x:25,y:6,drawType:"bottomToLeft"},
    {x:27,y:6,drawType:"vert"},
    //Row 7
    {x:0,y:7,drawType:"vert"},
    {x:2,y:7,drawType:"topToRight"},
    {x:3,y:7,drawType:"horz"},
    {x:4,y:7,drawType:"horz"},
    {x:5,y:7,drawType:"topToLeft"},
    {x:7,y:7,drawType:"vert"},
    {x:8,y:7,drawType:"vert"},
    {x:10,y:7,drawType:"topToRight"},
    {x:11,y:7,drawType:"horz"},
    {x:12,y:7,drawType:"horz"},
    {x:13,y:7,drawType:"bottomToLeft"},
    {x:14,y:7,drawType:"bottomToRight"},
    {x:15,y:7,drawType:"horz"},
    {x:16,y:7,drawType:"horz"},
    {x:17,y:7,drawType:"topToLeft"},
    {x:19,y:7,drawType:"vert"},
    {x:20,y:7,drawType:"vert"},
    {x:22,y:7,drawType:"topToRight"},
    {x:23,y:7,drawType:"horz"},
    {x:24,y:7,drawType:"horz"},
    {x:25,y:7,drawType:"topToLeft"},
    {x:27,y:7,drawType:"vert"},
    //Row 8
    {x:0,y:8,drawType:"vert"},
    {x:7,y:8,drawType:"vert"},
    {x:8,y:8,drawType:"vert"},
    {x:13,y:8,drawType:"vert"},
    {x:14,y:8,drawType:"vert"},
    {x:19,y:8,drawType:"vert"},
    {x:20,y:8,drawType:"vert"},
    {x:27,y:8,drawType:"vert"},
    //Row 9
    {x:0,y:9,drawType:"topToRight"},
    {x:1,y:9,drawType:"horz"},
    {x:2,y:9,drawType:"horz"},
    {x:3,y:9,drawType:"horz"},
    {x:4,y:9,drawType:"horz"},
    {x:5,y:9,drawType:"bottomToLeft"},
    {x:7,y:9,drawType:"vert"},
    {x:8,y:9,drawType:"topToRight"},
    {x:9,y:9,drawType:"horz"},
    {x:10,y:9,drawType:"horz"},
    {x:11,y:9,drawType:"bottomToLeft"},
    {x:13,y:9,drawType:"vert"},
    {x:14,y:9,drawType:"vert"},
    {x:16,y:9,drawType:"bottomToRight"},
    {x:17,y:9,drawType:"horz"},
    {x:18,y:9,drawType:"horz"},
    {x:19,y:9,drawType:"topToLeft"},
    {x:20,y:9,drawType:"vert"},
    {x:22,y:9,drawType:"bottomToRight"},
    {x:23,y:9,drawType:"horz"},
    {x:24,y:9,drawType:"horz"},
    {x:25,y:9,drawType:"horz"},
    {x:26,y:9,drawType:"horz"},
    {x:27,y:9,drawType:"topToLeft"},
    //Row 10
    {x:5,y:10,drawType:"vert"},
    {x:7,y:10,drawType:"vert"},
    {x:8,y:10,drawType:"bottomToRight"},
    {x:9,y:10,drawType:"horz"},
    {x:10,y:10,drawType:"horz"},
    {x:11,y:10,drawType:"topToLeft"},
    {x:13,y:10,drawType:"topToRight"},
    {x:14,y:10,drawType:"topToLeft"},
    {x:16,y:10,drawType:"topToRight"},
    {x:17,y:10,drawType:"horz"},
    {x:18,y:10,drawType:"horz"},
    {x:19,y:10,drawType:"bottomToLeft"},
    {x:20,y:10,drawType:"vert"},
    {x:22,y:10,drawType:"vert"},
    //Row 11
    {x:5,y:11,drawType:"vert"},
    {x:7,y:11,drawType:"vert"},
    {x:8,y:11,drawType:"vert"},
    {x:19,y:11,drawType:"vert"},
    {x:20,y:11,drawType:"vert"},
    {x:22,y:11,drawType:"vert"},
    //Row 12
    {x:5,y:12,drawType:"vert"},
    {x:7,y:12,drawType:"vert"},
    {x:8,y:12,drawType:"vert"},
    {x:10,y:12,drawType:"bottomToRight"},
    {x:11,y:12,drawType:"horz"},
    {x:12,y:12,drawType:"horz"},
    {x:13,y:12,drawType:"horz"},
    {x:14,y:12,drawType:"horz"},
    {x:15,y:12,drawType:"horz"},
    {x:16,y:12,drawType:"horz"},
    {x:17,y:12,drawType:"bottomToLeft"},
    {x:19,y:12,drawType:"vert"},
    {x:20,y:12,drawType:"vert"},
    {x:22,y:12,drawType:"vert"},
    //Row 13
    {x:0,y:13,drawType:"horz"},
    {x:1,y:13,drawType:"horz"},
    {x:2,y:13,drawType:"horz"},
    {x:3,y:13,drawType:"horz"},
    {x:4,y:13,drawType:"horz"},
    {x:5,y:13,drawType:"topToLeft"},
    {x:7,y:13,drawType:"topToRight"},
    {x:8,y:13,drawType:"topToLeft"},
    {x:10,y:13,drawType:"vert"},
    {x:17,y:13,drawType:"vert"},
    {x:19,y:13,drawType:"topToRight"},
    {x:20,y:13,drawType:"topToLeft"},
    {x:22,y:13,drawType:"topToRight"},
    {x:23,y:13,drawType:"horz"},
    {x:24,y:13,drawType:"horz"},
    {x:25,y:13,drawType:"horz"},
    {x:26,y:13,drawType:"horz"},
    {x:27,y:13,drawType:"horz"},
    //Row 14
    {x:10,y:14,drawType:"vert"},
    {x:17,y:14,drawType:"vert"},
    //Row 15
    {x:0,y:15,drawType:"horz"},
    {x:1,y:15,drawType:"horz"},
    {x:2,y:15,drawType:"horz"},
    {x:3,y:15,drawType:"horz"},
    {x:4,y:15,drawType:"horz"},
    {x:5,y:15,drawType:"bottomToLeft"},
    {x:7,y:15,drawType:"bottomToRight"},
    {x:8,y:15,drawType:"bottomToLeft"},
    {x:10,y:15,drawType:"vert"},
    {x:17,y:15,drawType:"vert"},
    {x:19,y:15,drawType:"bottomToRight"},
    {x:20,y:15,drawType:"bottomToLeft"},
    {x:22,y:15,drawType:"bottomToRight"},
    {x:23,y:15,drawType:"horz"},
    {x:24,y:15,drawType:"horz"},
    {x:25,y:15,drawType:"horz"},
    {x:26,y:15,drawType:"horz"},
    {x:27,y:15,drawType:"horz"},
    //Row 16
    {x:5,y:16,drawType:"vert"},
    {x:7,y:16,drawType:"vert"},
    {x:8,y:16,drawType:"vert"},
    {x:10,y:16,drawType:"topToRight"},
    {x:11,y:16,drawType:"horz"},
    {x:12,y:16,drawType:"horz"},
    {x:13,y:16,drawType:"horz"},
    {x:14,y:16,drawType:"horz"},
    {x:15,y:16,drawType:"horz"},
    {x:16,y:16,drawType:"horz"},
    {x:17,y:16,drawType:"topToLeft"},
    {x:19,y:16,drawType:"vert"},
    {x:20,y:16,drawType:"vert"},
    {x:22,y:16,drawType:"vert"},
    //Row 17
    {x:5,y:17,drawType:"vert"},
    {x:7,y:17,drawType:"vert"},
    {x:8,y:17,drawType:"vert"},
    {x:19,y:17,drawType:"vert"},
    {x:20,y:17,drawType:"vert"},
    {x:22,y:17,drawType:"vert"},
    //Row 18
    {x:5,y:18,drawType:"vert"},
    {x:7,y:18,drawType:"vert"},
    {x:8,y:18,drawType:"vert"},
    {x:10,y:18,drawType:"bottomToRight"},
    {x:11,y:18,drawType:"horz"},
    {x:12,y:18,drawType:"horz"},
    {x:13,y:18,drawType:"horz"},
    {x:14,y:18,drawType:"horz"},
    {x:15,y:18,drawType:"horz"},
    {x:16,y:18,drawType:"horz"},
    {x:17,y:18,drawType:"bottomToLeft"},
    {x:19,y:18,drawType:"vert"},
    {x:20,y:18,drawType:"vert"},
    {x:22,y:18,drawType:"vert"},
    //Row 19
    {x:0,y:19,drawType:"bottomToRight"},
    {x:1,y:19,drawType:"horz"},
    {x:2,y:19,drawType:"horz"},
    {x:3,y:19,drawType:"horz"},
    {x:4,y:19,drawType:"horz"},
    {x:5,y:19,drawType:"topToLeft"},
    {x:7,y:19,drawType:"topToRight"},
    {x:8,y:19,drawType:"topToLeft"},
    {x:10,y:19,drawType:"topToRight"},
    {x:11,y:19,drawType:"horz"},
    {x:12,y:19,drawType:"horz"},
    {x:13,y:19,drawType:"bottomToLeft"},
    {x:14,y:19,drawType:"bottomToRight"},
    {x:15,y:19,drawType:"horz"},
    {x:16,y:19,drawType:"horz"},
    {x:17,y:19,drawType:"topToLeft"},
    {x:19,y:19,drawType:"topToRight"},
    {x:20,y:19,drawType:"topToLeft"},
    {x:22,y:19,drawType:"topToRight"},
    {x:23,y:19,drawType:"horz"},
    {x:24,y:19,drawType:"horz"},
    {x:25,y:19,drawType:"horz"},
    {x:26,y:19,drawType:"horz"},
    {x:27,y:19,drawType:"bottomToLeft"},
    //Row 20
    {x:0,y:20,drawType:"vert"},
    {x:13,y:20,drawType:"vert"},
    {x:14,y:20,drawType:"vert"},
    {x:27,y:20,drawType:"vert"},
    //Row 21
    {x:0,y:21,drawType:"vert"},
    {x:2,y:21,drawType:"bottomToRight"},
    {x:3,y:21,drawType:"horz"},
    {x:4,y:21,drawType:"horz"},
    {x:5,y:21,drawType:"bottomToLeft"},
    {x:7,y:21,drawType:"bottomToRight"},
    {x:8,y:21,drawType:"horz"},
    {x:9,y:21,drawType:"horz"},
    {x:10,y:21,drawType:"horz"},
    {x:11,y:21,drawType:"bottomToLeft"},
    {x:13,y:21,drawType:"vert"},
    {x:14,y:21,drawType:"vert"},
    {x:16,y:21,drawType:"bottomToRight"},
    {x:17,y:21,drawType:"horz"},
    {x:18,y:21,drawType:"horz"},
    {x:19,y:21,drawType:"horz"},
    {x:20,y:21,drawType:"bottomToLeft"},
    {x:22,y:21,drawType:"bottomToRight"},
    {x:23,y:21,drawType:"horz"},
    {x:24,y:21,drawType:"horz"},
    {x:25,y:21,drawType:"bottomToLeft"},
    {x:27,y:21,drawType:"vert"},
    //Row 22
    {x:0,y:22,drawType:"vert"},
    {x:2,y:22,drawType:"topToRight"},
    {x:3,y:22,drawType:"horz"},
    {x:4,y:22,drawType:"bottomToLeft"},
    {x:5,y:22,drawType:"vert"},
    {x:7,y:22,drawType:"topToRight"},
    {x:8,y:22,drawType:"horz"},
    {x:9,y:22,drawType:"horz"},
    {x:10,y:22,drawType:"horz"},
    {x:11,y:22,drawType:"topToLeft"},
    {x:13,y:22,drawType:"topToRight"},
    {x:14,y:22,drawType:"topToLeft"},
    {x:16,y:22,drawType:"topToRight"},
    {x:17,y:22,drawType:"horz"},
    {x:18,y:22,drawType:"horz"},
    {x:19,y:22,drawType:"horz"},
    {x:20,y:22,drawType:"topToLeft"},
    {x:22,y:22,drawType:"vert"},
    {x:23,y:22,drawType:"bottomToRight"},
    {x:24,y:22,drawType:"horz"},
    {x:25,y:22,drawType:"topToLeft"},
    {x:27,y:22,drawType:"vert"},
    //Row 23
    {x:0,y:23,drawType:"vert"},
    {x:4,y:23,drawType:"vert"},
    {x:5,y:23,drawType:"vert"},
    {x:22,y:23,drawType:"vert"},
    {x:23,y:23,drawType:"vert"},
    {x:27,y:23,drawType:"vert"},
    //Row 24
    {x:0,y:24,drawType:"topToRight"},
    {x:1,y:24,drawType:"horz"},
    {x:2,y:24,drawType:"bottomToLeft"},
    {x:4,y:24,drawType:"vert"},
    {x:5,y:24,drawType:"vert"},
    {x:7,y:24,drawType:"bottomToRight"},
    {x:8,y:24,drawType:"bottomToLeft"},
    {x:10,y:24,drawType:"bottomToRight"},
    {x:11,y:24,drawType:"horz"},
    {x:12,y:24,drawType:"horz"},
    {x:13,y:24,drawType:"horz"},
    {x:14,y:24,drawType:"horz"},
    {x:15,y:24,drawType:"horz"},
    {x:16,y:24,drawType:"horz"},
    {x:17,y:24,drawType:"bottomToLeft"},
    {x:19,y:24,drawType:"bottomToRight"},
    {x:20,y:24,drawType:"bottomToLeft"},
    {x:22,y:24,drawType:"vert"},
    {x:23,y:24,drawType:"vert"},
    {x:25,y:24,drawType:"bottomToRight"},
    {x:26,y:24,drawType:"horz"},
    {x:27,y:24,drawType:"topToLeft"},
    //Row 25
    {x:0,y:25,drawType:"bottomToRight"},
    {x:1,y:25,drawType:"horz"},
    {x:2,y:25,drawType:"topToLeft"},
    {x:4,y:25,drawType:"topToRight"},
    {x:5,y:25,drawType:"topToLeft"},
    {x:7,y:25,drawType:"vert"},
    {x:8,y:25,drawType:"vert"},
    {x:10,y:25,drawType:"topToRight"},
    {x:11,y:25,drawType:"horz"},
    {x:12,y:25,drawType:"horz"},
    {x:13,y:25,drawType:"bottomToLeft"},
    {x:14,y:25,drawType:"bottomToRight"},
    {x:15,y:25,drawType:"horz"},
    {x:16,y:25,drawType:"horz"},
    {x:17,y:25,drawType:"topToLeft"},
    {x:19,y:25,drawType:"vert"},
    {x:20,y:25,drawType:"vert"},
    {x:22,y:25,drawType:"topToRight"},
    {x:23,y:25,drawType:"topToLeft"},
    {x:25,y:25,drawType:"topToRight"},
    {x:26,y:25,drawType:"horz"},
    {x:27,y:25,drawType:"bottomToLeft"},
    //Row 26
    {x:0,y:26,drawType:"vert"},
    {x:7,y:26,drawType:"vert"},
    {x:8,y:26,drawType:"vert"},
    {x:13,y:26,drawType:"vert"},
    {x:14,y:26,drawType:"vert"},
    {x:19,y:26,drawType:"vert"},
    {x:20,y:26,drawType:"vert"},
    {x:27,y:26,drawType:"vert"},
    //Row 27
    {x:0,y:27,drawType:"vert"},
    {x:2,y:27,drawType:"bottomToRight"},
    {x:3,y:27,drawType:"horz"},
    {x:4,y:27,drawType:"horz"},
    {x:5,y:27,drawType:"horz"},
    {x:6,y:27,drawType:"horz"},
    {x:7,y:27,drawType:"topToLeft"},
    {x:8,y:27,drawType:"topToRight"},
    {x:9,y:27,drawType:"horz"},
    {x:10,y:27,drawType:"horz"},
    {x:11,y:27,drawType:"bottomToLeft"},
    {x:13,y:27,drawType:"vert"},
    {x:14,y:27,drawType:"vert"},
    {x:16,y:27,drawType:"bottomToRight"},
    {x:17,y:27,drawType:"horz"},
    {x:18,y:27,drawType:"horz"},
    {x:19,y:27,drawType:"topToLeft"},
    {x:20,y:27,drawType:"topToRight"},
    {x:21,y:27,drawType:"horz"},
    {x:22,y:27,drawType:"horz"},
    {x:23,y:27,drawType:"horz"},
    {x:24,y:27,drawType:"horz"},
    {x:25,y:27,drawType:"bottomToLeft"},
    {x:27,y:27,drawType:"vert"},
    //Row 28
    {x:0,y:28,drawType:"vert"},
    {x:2,y:28,drawType:"topToRight"},
    {x:3,y:28,drawType:"horz"},
    {x:4,y:28,drawType:"horz"},
    {x:5,y:28,drawType:"horz"},
    {x:6,y:28,drawType:"horz"},
    {x:7,y:28,drawType:"horz"},
    {x:8,y:28,drawType:"horz"},
    {x:9,y:28,drawType:"horz"},
    {x:10,y:28,drawType:"horz"},
    {x:11,y:28,drawType:"topToLeft"},
    {x:13,y:28,drawType:"topToRight"},
    {x:14,y:28,drawType:"topToLeft"},
    {x:16,y:28,drawType:"topToRight"},
    {x:17,y:28,drawType:"horz"},
    {x:18,y:28,drawType:"horz"},
    {x:19,y:28,drawType:"horz"},
    {x:20,y:28,drawType:"horz"},
    {x:21,y:28,drawType:"horz"},
    {x:22,y:28,drawType:"horz"},
    {x:23,y:28,drawType:"horz"},
    {x:24,y:28,drawType:"horz"},
    {x:25,y:28,drawType:"topToLeft"},
    {x:27,y:28,drawType:"vert"},
    //Row 29
    {x:0,y:29,drawType:"vert"},
    {x:27,y:29,drawType:"vert"},
    //Row 30
    {x:0,y:30,drawType:"topToRight"},
    {x:1,y:30,drawType:"horz"},
    {x:2,y:30,drawType:"horz"},
    {x:3,y:30,drawType:"horz"},
    {x:4,y:30,drawType:"horz"},
    {x:5,y:30,drawType:"horz"},
    {x:6,y:30,drawType:"horz"},
    {x:7,y:30,drawType:"horz"},
    {x:8,y:30,drawType:"horz"},
    {x:9,y:30,drawType:"horz"},
    {x:10,y:30,drawType:"horz"},
    {x:11,y:30,drawType:"horz"},
    {x:12,y:30,drawType:"horz"},
    {x:13,y:30,drawType:"horz"},
    {x:14,y:30,drawType:"horz"},
    {x:15,y:30,drawType:"horz"},
    {x:16,y:30,drawType:"horz"},
    {x:17,y:30,drawType:"horz"},
    {x:18,y:30,drawType:"horz"},
    {x:19,y:30,drawType:"horz"},
    {x:20,y:30,drawType:"horz"},
    {x:21,y:30,drawType:"horz"},
    {x:22,y:30,drawType:"horz"},
    {x:23,y:30,drawType:"horz"},
    {x:24,y:30,drawType:"horz"},
    {x:25,y:30,drawType:"horz"},
    {x:26,y:30,drawType:"horz"},
    {x:27,y:30,drawType:"topToLeft"},
];

const space = [
    //Row 1
    {x:6,y:1},
    {x:7,y:1},
    {x:8,y:1},
    {x:9,y:1},
    {x:10,y:1},
    {x:11,y:1},
    {x:12,y:1},
    {x:15,y:1},
    {x:16,y:1},
    {x:17,y:1},
    {x:18,y:1},
    {x:19,y:1},
    {x:20,y:1},
    {x:21,y:1},
    //Row 2
    {x:6,y:2},
    {x:12,y:2},
    {x:15,y:2},
    {x:21,y:2},
    //Row 3
    {x:6,y:3},
    {x:12,y:3},
    {x:15,y:3},
    {x:21,y:3},
    //Row 4
    {x:6,y:4},
    {x:12,y:4},
    {x:15,y:4},
    {x:21,y:4},
    //Row 5
    {x:1,y:5},
    {x:2,y:5},
    {x:3,y:5},
    {x:4,y:5},
    {x:5,y:5},
    {x:6,y:5},
    {x:7,y:5},
    {x:8,y:5},
    {x:9,y:5},
    {x:10,y:5},
    {x:11,y:5},
    {x:12,y:5},
    {x:13,y:5},
    {x:14,y:5},
    {x:15,y:5},
    {x:16,y:5},
    {x:17,y:5},
    {x:18,y:5},
    {x:19,y:5},
    {x:20,y:5},
    {x:21,y:5},
    {x:22,y:5},
    {x:23,y:5},
    {x:24,y:5},
    {x:25,y:5},
    {x:26,y:5},
    //Row 6
    {x:1,y:6},
    {x:6,y:6},
    {x:9,y:6},
    {x:18,y:6},
    {x:21,y:6},
    {x:26,y:6},
    //Row 7
    {x:1,y:7},
    {x:6,y:7},
    {x:9,y:7},
    {x:18,y:7},
    {x:21,y:7},
    {x:26,y:7},
    //Row 8
    {x:1,y:8},
    {x:2,y:8},
    {x:3,y:8},
    {x:4,y:8},
    {x:5,y:8},
    {x:6,y:8},
    {x:9,y:8},
    {x:10,y:8},
    {x:11,y:8},
    {x:12,y:8},
    {x:15,y:8},
    {x:16,y:8},
    {x:17,y:8},
    {x:18,y:8},
    {x:21,y:8},
    {x:22,y:8},
    {x:23,y:8},
    {x:24,y:8},
    {x:25,y:8},
    {x:26,y:8},
    //Row 9
    {x:6,y:9},
    {x:12,y:9},
    {x:15,y:9},
    {x:21,y:9},
    //Row 10
    {x:6,y:10},
    {x:12,y:10},
    {x:15,y:10},
    {x:21,y:10},
    //Row 11
    {x:6,y:11},
    {x:9,y:11},
    {x:10,y:11},
    {x:11,y:11},
    {x:12,y:11},
    {x:13,y:11},
    {x:14,y:11},
    {x:15,y:11},
    {x:16,y:11},
    {x:17,y:11},
    {x:18,y:11},
    {x:21,y:11},
    //Row 12
    {x:6,y:12},
    {x:9,y:12},
    {x:18,y:12},
    {x:21,y:12},
    //Row 13
    {x:6,y:13},
    {x:9,y:13},
    {x:18,y:13},
    {x:21,y:13},
    //Row 14
    {x:1,y:14},
    {x:2,y:14},
    {x:3,y:14},
    {x:4,y:14},
    {x:5,y:14},
    {x:6,y:14},
    {x:7,y:14},
    {x:8,y:14},
    {x:9,y:14},
    {x:18,y:14},
    {x:19,y:14},
    {x:20,y:14},
    {x:21,y:14},
    {x:22,y:14},
    {x:23,y:14},
    {x:24,y:14},
    {x:25,y:14},
    {x:26,y:14},
    //Row 15
    {x:6,y:15},
    {x:9,y:15},
    {x:18,y:15},
    {x:21,y:15},
    //Row 16
    {x:6,y:16},
    {x:9,y:16},
    {x:18,y:16},
    {x:21,y:16},
    //Row 17
    {x:6,y:17},
    {x:9,y:17},
    {x:10,y:17},
    {x:11,y:17},
    {x:12,y:17},
    {x:13,y:17},
    {x:14,y:17},
    {x:15,y:17},
    {x:16,y:17},
    {x:17,y:17},
    {x:18,y:17},
    {x:21,y:17},
    //Row 18
    {x:6,y:18},
    {x:9,y:18},
    {x:18,y:18},
    {x:21,y:18},
    //Row 19
    {x:6,y:19},
    {x:9,y:19},
    {x:18,y:19},
    {x:21,y:19},
    //Row 20
    {x:6,y:20},
    {x:7,y:20},
    {x:8,y:20},
    {x:9,y:20},
    {x:10,y:20},
    {x:11,y:20},
    {x:12,y:20},
    {x:15,y:20},
    {x:16,y:20},
    {x:17,y:20},
    {x:18,y:20},
    {x:19,y:20},
    {x:20,y:20},
    {x:21,y:20},
    //Row 21
    {x:6,y:21},
    {x:12,y:21},
    {x:15,y:21},
    {x:21,y:21},
    //Row 22
    {x:6,y:22},
    {x:12,y:22},
    {x:15,y:22},
    {x:21,y:22},
    //Row 23
    {x:6,y:23},
    {x:7,y:23},
    {x:8,y:23},
    {x:9,y:23},
    {x:10,y:23},
    {x:11,y:23},
    {x:12,y:23},
    {x:13,y:23},
    {x:14,y:23},
    {x:15,y:23},
    {x:16,y:23},
    {x:17,y:23},
    {x:18,y:23},
    {x:19,y:23},
    {x:20,y:23},
    {x:21,y:23},
    //Row 24
    {x:6,y:24},
    {x:9,y:24},
    {x:18,y:24},
    {x:21,y:24},
    //Row 25
    {x:6,y:25},
    {x:9,y:25},
    {x:18,y:25},
    {x:21,y:25},
    //Row 26
    {x:1,y:26},
    {x:2,y:26},
    {x:3,y:26},
    {x:4,y:26},
    {x:5,y:26},
    {x:6,y:26},
    {x:9,y:26},
    {x:10,y:26},
    {x:11,y:26},
    {x:12,y:26},
    {x:15,y:26},
    {x:16,y:26},
    {x:17,y:26},
    {x:18,y:26},
    {x:21,y:26},
    {x:22,y:26},
    {x:23,y:26},
    {x:24,y:26},
    {x:25,y:26},
    {x:26,y:26},
    //Row 27
    {x:1,y:27},
    {x:12,y:27},
    {x:15,y:27},
    {x:26,y:27},
    //Row 28
    {x:1,y:28},
    {x:12,y:28},
    {x:15,y:28},
    {x:26,y:28},
    //Row 29
    {x:1,y:29},
    {x:2,y:29},
    {x:3,y:29},
    {x:4,y:29},
    {x:5,y:29},
    {x:6,y:29},
    {x:7,y:29},
    {x:8,y:29},
    {x:9,y:29},
    {x:10,y:29},
    {x:11,y:29},
    {x:12,y:29},
    {x:13,y:29},
    {x:14,y:29},
    {x:15,y:29},
    {x:16,y:29},
    {x:17,y:29},
    {x:18,y:29},
    {x:19,y:29},
    {x:20,y:29},
    {x:21,y:29},
    {x:22,y:29},
    {x:23,y:29},
    {x:24,y:29},
    {x:25,y:29},
    {x:26,y:29}
];

const ghostUpSpecialSpaces = [
    {x:12,y:10,drawType:"none"},
    {x:15,y:10,drawType:"none"},
    {x:12,y:21,drawType:"none"},
    {x:15,y:21,drawType:"none"}
];

const ghostGoingHomeSpecialSpaces = [
    {x:9,y:5,dx:0,dy:1},
    {x:18,y:5,dx:0,dy:1},
    {x:12,y:5,dx:-1,dy:0},
    {x:15,y:5,dx:1,dy:0}
];

const ghostPrisonPaths = {
    blinky:[
        {x:13.5,y:11},
        {x:13.5,y:11.125},
        {x:13.5,y:11.25},
        {x:13.5,y:11.375},
        {x:13.5,y:11.5},
        {x:13.5,y:11.625},
        {x:13.5,y:11.75},
        {x:13.5,y:11.875},
        {x:13.5,y:12},
        {x:13.5,y:12.125},
        {x:13.5,y:12.25},
        {x:13.5,y:12.375},
        {x:13.5,y:12.5},
        {x:13.5,y:12.625},
        {x:13.5,y:12.75},
        {x:13.5,y:12.875},
        {x:13.5,y:13},
        {x:13.5,y:13.125},
        {x:13.5,y:13.25},
        {x:13.5,y:13.375},
        {x:13.5,y:13.5},
        {x:13.5,y:13.625},
        {x:13.5,y:13.75},
        {x:13.5,y:13.875},
        {x:13.5,y:14}
    ],
    pinky:[
        {x:13.5,y:11},
        {x:13.5,y:11.125},
        {x:13.5,y:11.25},
        {x:13.5,y:11.375},
        {x:13.5,y:11.5},
        {x:13.5,y:11.625},
        {x:13.5,y:11.75},
        {x:13.5,y:11.875},
        {x:13.5,y:12},
        {x:13.5,y:12.125},
        {x:13.5,y:12.25},
        {x:13.5,y:12.375},
        {x:13.5,y:12.5},
        {x:13.5,y:12.625},
        {x:13.5,y:12.75},
        {x:13.5,y:12.875},
        {x:13.5,y:13},
        {x:13.5,y:13.125},
        {x:13.5,y:13.25},
        {x:13.5,y:13.375},
        {x:13.5,y:13.5},
        {x:13.5,y:13.625},
        {x:13.5,y:13.75},
        {x:13.5,y:13.875},
        {x:13.5,y:14}
    ],
    inky:[
        {x:13.5,y:11},
        {x:13.5,y:11.125},
        {x:13.5,y:11.25},
        {x:13.5,y:11.375},
        {x:13.5,y:11.5},
        {x:13.5,y:11.625},
        {x:13.5,y:11.75},
        {x:13.5,y:11.875},
        {x:13.5,y:12},
        {x:13.5,y:12.125},
        {x:13.5,y:12.25},
        {x:13.5,y:12.375},
        {x:13.5,y:12.5},
        {x:13.5,y:12.625},
        {x:13.5,y:12.75},
        {x:13.5,y:12.875},
        {x:13.5,y:13},
        {x:13.5,y:13.125},
        {x:13.5,y:13.25},
        {x:13.5,y:13.375},
        {x:13.5,y:13.5},
        {x:13.5,y:13.625},
        {x:13.5,y:13.75},
        {x:13.5,y:13.875},
        {x:13.5,y:14},
        {x:13.375,y:14},
        {x:13.25,y:14},
        {x:13.125,y:14},
        {x:13,y:14},
        {x:12.875,y:14},
        {x:12.75,y:14},
        {x:12.625,y:14},
        {x:12.5,y:14},
        {x:12.375,y:14},
        {x:12.25,y:14},
        {x:12.125,y:14},
        {x:12,y:14},
        {x:11.875,y:14},
        {x:11.75,y:14},
        {x:11.625,y:14},
        {x:11.5,y:14},
    ],
    clyde:[
        {x:13.5,y:11},
        {x:13.5,y:11.125},
        {x:13.5,y:11.25},
        {x:13.5,y:11.375},
        {x:13.5,y:11.5},
        {x:13.5,y:11.625},
        {x:13.5,y:11.75},
        {x:13.5,y:11.875},
        {x:13.5,y:12},
        {x:13.5,y:12.125},
        {x:13.5,y:12.25},
        {x:13.5,y:12.375},
        {x:13.5,y:12.5},
        {x:13.5,y:12.625},
        {x:13.5,y:12.75},
        {x:13.5,y:12.875},
        {x:13.5,y:13},
        {x:13.5,y:13.125},
        {x:13.5,y:13.25},
        {x:13.5,y:13.375},
        {x:13.5,y:13.5},
        {x:13.5,y:13.625},
        {x:13.5,y:13.75},
        {x:13.5,y:13.875},
        {x:13.5,y:14},
        {x:13.625,y:14},
        {x:13.75,y:14},
        {x:13.875,y:14},
        {x:14,y:14},
        {x:14.125,y:14},
        {x:14.25,y:14},
        {x:14.375,y:14},
        {x:14.5,y:14},
        {x:14.625,y:14},
        {x:14.75,y:14},
        {x:14.875,y:14},
        {x:15,y:14},
        {x:15.125,y:14},
        {x:15.25,y:14},
        {x:15.375,y:14},
        {x:15.5,y:14},
    ]
};

const curveDirections = {
    vert:{startX:0,startY:-10,endX:0,endY:10},
    horz:{startX:-10,startY:0,endX:10,endY:0},
    topToLeft:{startX:0,startY:-10,endX:-10,endY:0},
    topToRight:{startX:0,startY:-10,endX:10,endY:0},
    bottomToLeft:{startX:0,startY:10,endX:-10,endY:0},
    bottomToRight:{startX:0,startY:10,endX:10,endY:0},
    head:{size:15},
    body:{size:12},
    tail:{size:11}
};

const foodTypes = {
    cherry:"#FF0100",
    melon:"#00FF01",
    peach:"#FFB752"
};

const directions = {
    up:{x:0,y:-1},
    left:{x:-1,y:0},
    down:{x:0,y:1},
    right:{x:1,y:0}
}


// KEY PRESS EVENT HANDLING

document.addEventListener('keydown', handleKeyPress);

/**
 * Key Down stores the direction to move when next possible
 * @param {Event} event 
 */
function handleKeyPress(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const SPACE_KEY = 32;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    const keyPressed = event.keyCode || event;

    if (keyPressed === UP_KEY && !goingDown) {
        dxStored = directions.up.x;
        dyStored = directions.up.y;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dxStored = directions.right.x;
        dyStored = directions.right.y;
        if (!gameRunning) { startGame(); }
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dxStored = directions.down.x;
        dyStored = directions.down.y;
    }
    if (keyPressed === LEFT_KEY && !goingRight) {
        dxStored = directions.left.x;
        dyStored = directions.left.y;
        if (!gameRunning) { startGame(); }
    }
}


// USEFUL FUNCTIONS

/**
 * Select random variable in array using random number from 0 to array length
 * @param {Array} array 
 * @returns Random item from array
 */
const randomFrom = array => array[Math.floor(Math.random()*array.length)];

/**
 * Converts Grid Unit to Canvas Unit
 * @param {Number} coord 
 * @returns {Number} Value of coord in canvas units
 */
const toGrid = coord => coord*20+10;

/**
 * Checks if a sprite is centred on a grid point or in between grid points
 * @param {Sprite} sprite 
 * @returns True if spite is centered
 */
const isCentered = sprite => sprite.x%1===0&&sprite.y%1===0;

/**
 * Calculates absolute distance between two sprites using pythagoras
 * @param {Sprite} spriteA 
 * @param {Sprite} spriteB 
 * @returns the distance between them
 */
const distanceTo = (spriteA,spriteB) => Math.sqrt(Math.abs(spriteA.x-spriteB.x)**2+Math.abs(spriteA.y-spriteB.y)**2);


// COLLISION TEST FUNCTIONS

/**
 * Checks for collision between two Sprites on Grid
 * @param {Sprite} a 
 * @param {Sprite} b 
 * @returns {boolean} true if they have the same coordinates
 */
const collides = (a,b) => a.x===b.x&&a.y===b.y;

/**
 * Checks for collision between two Sprites Rounded to closest grid point
 * @param {Sprite} a 
 * @param {Sprite} b 
 * @returns {boolean} true if they have the same rounded coordinates
 */
const collidesRounded = (a,b) => Math.round(a.x) === Math.round(b.x) && Math.round(a.y) === Math.round(b.y);

/**
 * Checks for collision between a Sprite and an Array on Grid
 * @param {Sprite} sprite 
 * @param {Array} array 
 * @returns element if any coordinates in the array match the sprite or false if not
 */
const collidesWithArray = function(sprite,array) {
    for (let el of array) {
        if (collides(sprite,el)) { return el }
    }
    return false;
}

/**
 * Checks for collision between a Sprite and an Array Rounded to closest grid point
 * @param {Sprite} sprite 
 * @param {Array} array 
 * @returns element if any rounded coordinates in the array match the sprite or false if not
 */
const collidesRoundedWithArray = function(sprite,array) {
    for (let el of array) {
        if (collidesRounded(sprite,el)) { return el }
    }
    return false;
}


// GAME DATA ALTERING FUNCTIONS

function initialiseGame() {
    score = 0;
    ghostsEaten = 0;
    foodEaten = 0;
    dx = dxStored;
    dy = dyStored;

    snake = [
        {x:13.5,y:23,drawType:"head"},
        {x:13.5-dxStored/4,y:23,drawType:"body"},
        {x:13.5-dxStored/2,y:23,drawType:"body"},
        {x:13.5-3*dxStored/4,y:23,drawType:"tail"}
    ];

    food = addFood();

    powers = [
        {x:1,y:3,drawType:"power"},
        {x:26,y:3,drawType:"power"},
        {x:1,y:20,drawType:"power"},
        {x:26,y:20,drawType:"power"},
    ];

    powered = 0;

    ghosts = {
        blinky:{sprite:{x:13.5,y:11,drawType:"rgb(255 5 0)"},movement:{dx:-1,dy:0,lastdx:0,lastdy:0,mode:"scatter",timeLeft:scatterTime},target:{x:25,y:-2,scatterX:25,scatterY:-2},home:{unlockLength:0,inHouse:false,leaving:0,entering:0,alreadyEaten:false}},
        pinky:{sprite:{x:13.5,y:14,drawType:"rgb(226 146 189)"},movement:{dx:1,dy:0,lastdx:0,lastdy:0,mode:"scatter",timeLeft:scatterTime},target:{x:2,y:-2,scatterX:2,scatterY:-2},home:{unlockLength:0,inHouse:true,leaving:ghostPrisonPaths.pinky.length,entering:0,alreadyEaten:false}},
        inky:{sprite:{x:11.5,y:14,drawType:"rgb(7 180 219)"},movement:{dx:-1,dy:0,lastdx:0,lastdy:0,mode:"scatter",timeLeft:scatterTime},target:{x:27,y:32,scatterX:27,scatterY:32},home:{unlockLength:30,inHouse:true,leaving:ghostPrisonPaths.inky.length,entering:0,alreadyEaten:false}},
        clyde:{sprite:{x:15.5,y:14,drawType:"rgb(228 148 0)"},movement:{dx:-1,dy:0,lastdx:0,lastdy:0,mode:"scatter",timeLeft:scatterTime},target:{x:0,y:32,scatterX:0,scatterY:32},home:{unlockLength:60,inHouse:true,leaving:ghostPrisonPaths.clyde.length,entering:0,alreadyEaten:false}}
    }

    drawGame(walls);
}

function moveSnake() {
    let newHead;
    let testHead;
    let newTail;
    let collidesWithWall;
    let collidesWithSelf;
    let collidesWithFood;
    let collidesWithPower;
    let loops;

    // POWERED CHECK

    // If powered, reduce power timer
    powered && powered--;

    // TURNING CHECK

    // If key has been pressed, snake looks in that direction to see if it can move that way
    // If so, change snakes direction
    newHead = {x:snake[0].x+dxStored,y:snake[0].y+dyStored,drawType:"head"}
    if (!collidesWithArray(newHead,walls)&&isCentered(newHead)) {
        dx = dxStored;
        dy = dyStored;
    }

    // COLLISION CHECKS

    // Looks ahead to next step and next grid space
    newHead = {x:snake[0].x+dx/4,y:snake[0].y+dy/4,drawType:"head"};
    testHead = {x:snake[0].x+dx,y:snake[0].y+dy,drawType:"head"}

    // Checks if next grid space is a wall
    collidesWithWall = collidesWithArray(testHead,walls);
    // Checks if next step collides with its own body and isn't powered
    collidesWithSelf = collidesWithArray(newHead,snake.slice(1)) && !powered;
    // Checks if next step collides with food
    collidesWithFood = collides(newHead,food);
    // Checks if next step collides with power
    collidesWithPower = collidesWithArray(newHead,powers);
    // Checks if next step is off the edge
    loops = newHead.x < 0.5 || newHead.x > 27.5;

    // If snake would collide with wall then don't move
    if (collidesWithWall) {
        return;
    // If snake would collide with itself, game over
    } else if (collidesWithSelf) {
        gameRunning = false;
    // If snake would get power then, set power counter to max, remove that power pellet, and affect ghosts
    } else if (collidesWithPower) {
        powered = powerTime;
        powers = powers.filter((el) => el!==collidesWithPower);
        for (let ghost of Object.values(ghosts)) {
            // If the ghost is notand heading home, reverse its direction and reset its already eaten status
            if (ghost.home.leaving===0) {    
                reverseGhost(ghost);
                ghost.home.alreadyEaten = false;
            }
        }
    // If snake would go off the edge, move it to the other edge
    } else if (loops) {
        newHead.x -= 28*Math.sign(newHead.x)
    }

    // Set current head to body and add new head
    snake[0].drawType = "body";
    snake.unshift(newHead);

    // If snake would eat food, create new food, grow snake three times
    if (collidesWithFood) {
        foodEaten++;
        food = addFood();
        newTail = {x:snake[snake.length-1].x,y:snake[snake.length-1].y,drawType:"tail"}
        for (let n = 0; n < growth; n++) {
            snake.push(newTail)
        }
    // Otherwise, remove tail and turn last body part into tail
    } else {
        snake.pop();
        snake[snake.length-1].drawType = "tail";
    }

    
}

function moveGhost(ghost,name) {
    let nextStep;
    let possibleStep;
    let reverseDirection;
    let smallestDistance;
    let distanceToTarget;
    let collidesWithWall;
    let goingHomeSpace;
    let theWayItCame;
    let cantGoUp;
    let collidesWithSnake;
    let loops;

    ghost.movement.lastdx = ghost.movement.dx;
    ghost.movement.lastdy = ghost.movement.dy;

    // TARGET SETTING

    // Sets target of ghost based on it's movement mode and if it's not going home after being eaten
    if (ghost.movement.mode==="chase"&&!ghost.home.leaving) {
        switch (name) {
            case "blinky":
                ghost.target.x = snake[0].x;
                ghost.target.y = snake[0].y;
                break;
            case "pinky":
                ghost.target.x = snake[0].x + dx*4;
                ghost.target.y = snake[0].y + dy*4;
                break;
            case "inky":
                ghost.target.x = snake[0].x + dx*2 + snake[0].x + dx*2 - ghosts["blinky"].sprite.x;
                ghost.target.y = snake[0].y + dy*2 + snake[0].y + dx*2 - ghosts["blinky"].sprite.y;
                break;
            case "clyde":
                if (distanceTo(snake[0],ghost.sprite)<8) {
                    ghost.target.x = ghost.target.scatterX;
                    ghost.target.y = ghost.target.scatterY;
                } else {
                    ghost.target.x = snake[0].x;
                    ghost.target.y = snake[0].y;
                }
                break;
        }
    } else if (ghost.movement.mode==="scatter"&&!ghost.home.leaving) {
        ghost.target.x = ghost.target.scatterX;
        ghost.target.y = ghost.target.scatterY;
    }

    // MOVEMENT DECISION ALGORITHM

    // Ghost looks ahead to where it's next step will be
    nextStep = {x:ghost.sprite.x+ghost.movement.dx/8,y:ghost.sprite.y+ghost.movement.dy/8,drawType:ghost.sprite.drawType};

    // If it's next step is centred on the grid, make decision on where to go next
    if (isCentered(nextStep)) {

        // Checks to see if next step is at a special going home space then forces the ghost to go towards home if it's been eaten
        goingHomeSpace = collidesWithArray(nextStep,ghostGoingHomeSpecialSpaces)
        if (ghost.home.entering>0 && goingHomeSpace) {
            if (goingHomeSpace.dy) {
                ghost.movement.dx = goingHomeSpace.dx;
                ghost.movement.dy = goingHomeSpace.dy;
            } else if (goingHomeSpace.dx && ghost.movement.dy) {
                ghost.movement.dx = goingHomeSpace.dx;
                ghost.movement.dy = goingHomeSpace.dy;
            }
        // If not, look at each direction from the next step and evaluate possible directions to move
        } else {
            smallestDistance = 10000;
            reverseDirection = [ghost.movement.dx*-1,ghost.movement.dy*-1]
            for (let direction of Object.values(directions)) {

                // Ghost looks at next possible step from its next step
                possibleStep = {x:nextStep.x+direction.x,y:nextStep.y+direction.y,drawType:nextStep.drawType}
                // Checks if possible step is a wall
                collidesWithWall = collidesWithArray(possibleStep,walls);
                // Checks if possible step is the way it just came from
                theWayItCame = reverseDirection[0]===direction.x&&reverseDirection[1]===direction.y;
                // Checks if possible step is the special case where it can't go up
                cantGoUp = direction.y===-1&&collidesWithArray(possibleStep,ghostUpSpecialSpaces);

                // If the possible step is none of these, check to see if it the closest step to the ghosts target
                // Set new direction movement to this steps direction
                if (!collidesWithWall&&!theWayItCame&&!cantGoUp) {
                    distanceToTarget = distanceTo(possibleStep,ghost.target)
                    if (distanceToTarget < smallestDistance) {
                        smallestDistance = distanceToTarget;
                        ghost.movement.dx = direction.x;
                        ghost.movement.dy = direction.y;
                    }
                }
            }
        }
    }

    // SNAKE AND EDGE INTERACTION
    
    // Checks to see if the ghost's next step collides with the snake
    collidesWithSnake = collidesRoundedWithArray(ghost.sprite,snake);
    // Checks to see if the ghost's next step goies off the side
    loops = nextStep.x < -0.5 || nextStep.x > 27.5;

    // If the ghost collides and is to going home after being eaten then evaluate the outcome
    if (collidesWithSnake&&ghost.home.leaving===0) {

        console.log(collidesWithSnake);

        // If the snake has powered up and the ghost has not already been eaten from that powerup, ghost gets eaten and starts heading home
        if (powered && !ghost.home.alreadyEaten) {
            ghostsEaten++;
            newTail = {x:snake[snake.length-1].x,y:snake[snake.length-1].y,drawType:"tail"}
            for (let n = 0; n < growth+5; n++) {
                snake.push(newTail)
            }
            ghost.target.x = 13.5;
            ghost.target.y = 11;
            ghost.home.entering = ghostPrisonPaths[name].length;
            ghost.home.leaving = ghostPrisonPaths[name].length;
            ghost.home.alreadyEaten = true;
        // Otherwise, the ghost can hurt the snake
        // If the ghost collides with the snakes head, game over
        } else if (collidesWithSnake.drawType === "head") {
            gameRunning = false;
        // If the ghost collides with the snakes body or tail, snake gets chopped off at that point on its body
        } else {
            snake = snake.slice(0,snake.indexOf(collidesWithSnake));
        }
    }

    // If the ghost's next step is off the side, move it to the other side
    if (loops) {
        nextStep.x -= 28*Math.sign(nextStep.x)
    }

    // Replace ghost with its next step
    ghost.sprite = nextStep;

}

function moveGhosts() {
    // Move each ghost
    for (let [ghostName,ghost] of Object.entries(ghosts)) {
        
        // TARGET TIMER

        // If the snake is not powered up
        if (!powered) {
            // Reduce counter onj current movement mode timer
            ghost.movement.timeLeft--;
            // If the ghost finishes leaving the house, make it eatable again
            if (!ghost.home.leaving) {
                ghost.home.alreadyEaten = false;
            }
        }
        
        // If the ghost movement mode timer is at 0, swap modes, reset timer and reverse ghosts direction
        if (!ghost.movement.timeLeft) {
            if (!ghost.home.leaving){
                reverseGhost(ghost);
            }
            if (ghost.movement.mode==="chase") {
                ghost.movement.mode = "scatter";
                ghost.movement.timeLeft = scatterTime;
            } else if (ghost.movement.mode==="scatter") {
                ghost.movement.mode = "chase";
                ghost.movement.timeLeft = chaseTime;
            }
        }

        // MOVEMENT

        // If the ghost is either entering or leaving home then it follows the path set out for it in ghostPrisonPaths
        if (ghost.home.inHouse) {
            if (ghost.home.entering){
                ghost.sprite.x = ghostPrisonPaths[ghostName].toReversed()[ghost.home.entering-1].x;
                ghost.sprite.y = ghostPrisonPaths[ghostName].toReversed()[ghost.home.entering-1].y;
                ghost.home.entering--;
            } else if (snake.length > ghost.home.unlockLength || (0<ghost.home.leaving && ghost.home.leaving<ghostPrisonPaths[ghostName].length)){
                ghost.sprite.x = ghostPrisonPaths[ghostName][ghost.home.leaving-1].x;
                ghost.sprite.y = ghostPrisonPaths[ghostName][ghost.home.leaving-1].y;
                ghost.home.leaving--;
                // Once the ghost has finished leaving, set it to out of house
                if (!ghost.home.leaving) { ghost.home.inHouse = false; }
            }
        // If the ghost is heading home after being eaten reaches the entry way to the home, set it to start entering
        } else if (ghost.home.entering&&ghost.sprite.x===13.5&&ghost.sprite.y===11) {
            ghost.home.inHouse = true;
        // Otherwise, move the ghost normally
        } else {
            moveGhost(ghost,ghostName)
        }

    }
}

let reverseGhost = function(ghost) {
    ghost.movement.dx = ghost.movement.lastdx*=-1;
    ghost.movement.dy = ghost.movement.lastdy*=-1;
}

let addFood = function() {
    // Chooses a random location and type for the new food, then places food there
    let foodLocation = randomFrom(space);
    let foodType = randomFrom(Object.keys(foodTypes));
    let food = {x:foodLocation.x,y:foodLocation.y,drawType:foodType}
    // If new food collides with any part of the snake, create new food
    for (let body of snake) {
        if (collides(food,body)) {
            food = addFood();
        }
    }
    return food;
}


// DRAW FUNCTIONS

/**
 * Draw snakes body part
 * @param {Sprite} body 
 */
function drawSnakeBody(body) {
    gridX = toGrid(body.x);
    gridY = toGrid(body.y);
    adjustment = curveDirections[body.drawType];
    ctx.beginPath();
    ctx.arc(gridX, gridY, adjustment.size, 0, 2 * Math.PI);
    ctx.fillStyle = powered ? "rgb(254 243 7 / 50%)" : "rgb(254 243 7 / 100%)";
    ctx.fill();
}

/**
 * Take a wall object and draw it as a curve
 * @param {Sprite} wall 
 */
function drawWall(wall) {
    gridX = toGrid(wall.x);
    gridY = toGrid(wall.y);
    adjustment = curveDirections[wall.drawType];
    ctx.beginPath();
    ctx.moveTo(gridX+adjustment.startX, gridY+adjustment.startY);
    ctx.quadraticCurveTo(gridX, gridY, gridX+adjustment.endX, gridY+adjustment.endY);
    ctx.strokeStyle = "#4B3EF1";
    ctx.stroke();
}

function drawFood() {
    gridX = toGrid(food.x);
    gridY = toGrid(food.y);
    ctx.beginPath();
    ctx.arc(gridX, gridY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = foodTypes[food.drawType];
    ctx.fill();
}

function drawPower(power) {
    gridX = toGrid(power.x);
    gridY = toGrid(power.y);
    ctx.beginPath();
    ctx.arc(gridX, gridY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#F7BD9A";
    ctx.fill();
}

function drawGhost(ghost) {
    gridX = toGrid(ghost.sprite.x);
    gridY = toGrid(ghost.sprite.y);
    ctx.beginPath();
    ctx.arc(gridX, gridY, 15, 0, 2 * Math.PI);
    if (ghost.home.entering) {
        ctx.fillStyle = "rgb(255 255 255 / 20%)";
    } else if (!powered || ghost.home.alreadyEaten) {
        ctx.fillStyle = ghost.sprite.drawType;
    } else if (powered > 50 || (powered%10 < 5 && powered > 0)) {
        ctx.fillStyle = "#2121DE";
    } else if (powered%10 >= 5) {
        ctx.fillStyle = "white";
    }
    ctx.fill();

}

function drawSnake() {
    for (let body of snake) {
        drawSnakeBody(body);
    }
}

function drawWalls() {
    ctx.lineWidth = 2.5;
    for (let wall of walls) {
        drawWall(wall);
    }
}

function drawPowers() {
    for (let power of powers) {
        drawPower(power);
    }
}

function drawGhosts() {
    for (let ghost of Object.values(ghosts)) {
        drawGhost(ghost);
    }
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawWalls();
    drawSnake();
    drawPowers();
    drawFood();
    drawGhosts();
}

function drawGameStart() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawWalls();
    drawSnake();
    drawPowers();
    drawGhosts();
}


// HTML INTERACTION FUNCTIONS

function updateCurrentScore() {
    let snakeLength = Math.ceil(snake.length/4)||0
    document.getElementById("current-length").innerHTML = "Length: " + snakeLength;
    document.getElementById("ghosts-eaten").innerHTML = "Ghosts Eaten: " + ghostsEaten;
    document.getElementById("food-eaten").innerHTML = "Food Eaten: " + foodEaten;
    document.getElementById("score").innerHTML = "SCORE: " + (foodEaten + 4*ghostsEaten)*snakeLength;
}

// GAME RUNNING FUNCTIONS

function updateGame() {
    if (gameRunning) {
        moveSnake();
        moveGhosts();
        drawGame();
        updateCurrentScore();
        setTimeout(updateGame,gameSpeed)
    } else {
        drawGameStart();
        updateCurrentScore();
        setTimeout(updateGame,gameSpeed)
    }
}

function startGame() {
    gameRunning = true;
    initialiseGame();
}

function endGame() {
    gameRunning = false;
    document.getElementById("game-over-text").style.display = "block";
    document.getElementById("final-score-text").style.display = "block";
    document.getElementById("final-score-text").innerHTML = "FINAL SCORE: " + (foodEaten + 4*ghostsEaten)*snakeLength;
    document.getElementById("start-screen").style.display = "flex";
}

function pressStart() {
    document.getElementById("start-screen").style.display = "none";
    dxStored=0;
    dyStored=0;
    initialiseGame();
    updateGame();
}

