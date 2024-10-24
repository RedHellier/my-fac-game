const canvas = document.getElementById("game-space");
const ctx = canvas.getContext("2d");

let walls, space, dx, dy, dxStored, dyStored, gridX, gridY, adjustment, snake, ghosts, food, powers, powered;
let gameRunning = false;
const powerTime = 80;
const chaseTime = 120;
const scatterTime = 80;
const gameSpeed = 40;

/**
 * @typedef Sprite
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {"horz"|"vert"|"bottomToLeft"|"bottomToRight"|"topToLeft"|"topToRight"|"headN"|"headE"|"headS"|"headW"} drawType
 */

const levelOneWalls = [
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

const levelOneSpace = [
    //Row 1
    {x:1,y:1},
    {x:2,y:1},
    {x:3,y:1},
    {x:4,y:1},
    {x:5,y:1},
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
    {x:22,y:1},
    {x:23,y:1},
    {x:24,y:1},
    {x:25,y:1},
    {x:26,y:1},
    //Row 2
    {x:1,y:2},
    {x:6,y:2},
    {x:12,y:2},
    {x:15,y:2},
    {x:21,y:2},
    {x:26,y:2},
    //Row 3
    {x:6,y:3},
    {x:12,y:3},
    {x:15,y:3},
    {x:21,y:3},
    //Row 4
    {x:1,y:4},
    {x:6,y:4},
    {x:12,y:4},
    {x:15,y:4},
    {x:21,y:4},
    {x:26,y:4},
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
    {x:1,y:20},
    {x:2,y:20},
    {x:3,y:20},
    {x:4,y:20},
    {x:5,y:20},
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
    {x:22,y:20},
    {x:23,y:20},
    {x:24,y:20},
    {x:25,y:20},
    {x:26,y:20},
    //Row 21
    {x:1,y:21},
    {x:6,y:21},
    {x:12,y:21},
    {x:15,y:21},
    {x:21,y:21},
    {x:26,y:21},
    //Row 22
    {x:1,y:22},
    {x:6,y:22},
    {x:12,y:22},
    {x:15,y:22},
    {x:21,y:22},
    {x:26,y:22},
    //Row 23
    {x:2,y:23},
    {x:3,y:23},
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
    {x:24,y:23},
    {x:25,y:23},
    //Row 24
    {x:3,y:24},
    {x:6,y:24},
    {x:9,y:24},
    {x:18,y:24},
    {x:21,y:24},
    {x:24,y:24},
    //Row 25
    {x:3,y:25},
    {x:6,y:25},
    {x:9,y:25},
    {x:18,y:25},
    {x:21,y:25},
    {x:24,y:25},
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
    cherry:"red",
    grapes:"purple",
    peach:"pink"
};

const directions = {
    up:[0,-0.25],
    left:[-0.25,0],
    down:[0,0.25],
    right:[0.25,0]
}

walls = levelOneWalls;
space = levelOneSpace;


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

    const keyPressed = event.keyCode;

    const goingUp = dy === -0.25;
    const goingDown = dy === 0.25;
    const goingRight = dx === 0.25;
    const goingLeft = dx === -0.25;

    if (keyPressed === UP_KEY && !goingDown) {
        dxStored = directions.up[0];
        dyStored = directions.up[1];
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dxStored = directions.right[0];
        dyStored = directions.right[1];
        if (!gameRunning) { startGame(); }
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dxStored = directions.down[0];
        dyStored = directions.down[1];
    }
    if (keyPressed === LEFT_KEY && !goingRight) {
        dxStored = directions.left[0];
        dyStored = directions.left[1];
        if (!gameRunning) { startGame(); }
    }
}


// USEFUL FUNCTIONS

/**
 * Select random variable in array using random number from 0 to array length
 * @param {Array} array 
 * @returns Random item from array
 */
let randomFrom = array => array[Math.floor(Math.random()*array.length)];

/**
 * Converts Grid Unit to Canvas Unit
 * @param {number} coord 
 * @returns {number} Value of coord in canvas units
 */
let toGrid = coord => coord*20+10;

let isCentered = sprite => sprite.x%1===0&&sprite.y%1===0;


// COLLISION TEST FUNCTIONS

/**
 * Checks for collision between two Sprites on Grid
 * @param {Sprite} a 
 * @param {Sprite} b 
 * @returns {boolean} true if they have the same coordinates
 */
let collides = (a,b) => a.x===b.x&&a.y===b.y;

/**
 * Checks for collision between a Sprite and an Array on Grid
 * @param {Sprite} head 
 * @param {Array} array 
 * @returns element if any coordinates in the array match the sprite or false if not
 */
let collidesWithArray = function(head,array) {
    for (let el of array) {
        if (collides(head,el)) { return el }
    }
    return false;
}


// GAME DATA ALTERING FUNCTIONS

function initialiseGame() {
    dx = dxStored;
    dy = dyStored;

    snake = [
        {x:13.5,y:23,drawType:"head"},
        {x:13.5-dxStored,y:23,drawType:"tail"},
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
        blinky:{sprite:{x:13.5,y:11,drawType:"red"},movement:{dx:-0.25,dy:0,mode:"chase",timeLeft:chaseTime},target:{x:snake[0].x,y:snake[0].y,scatterX:27,scatterY:0}},
        pinky:{sprite:{x:1,y:1,drawType:"pink"},movement:{dx:0.25,dy:0,mode:"chase",timeLeft:500},target:{x:snake[0].x,y:snake[0].y,scatterX:0,scatterY:0}},
        inky:{sprite:{x:26,y:1,drawType:"blue"},movement:{dx:-0.25,dy:0,mode:"chase",timeLeft:500},target:{x:snake[0].x,y:snake[0].y,scatterX:27,scatterY:30}},
        clyde:{sprite:{x:26,y:29,drawType:"yellow"},movement:{dx:-0.25,dy:0,mode:"chase",timeLeft:500},target:{x:snake[0].x,y:snake[0].y,scatterX:0,scatterY:30}}
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

    powered ? powered-- : powered = 0;

    newHead = {x:snake[0].x+dxStored*4,y:snake[0].y+dyStored*4,drawType:"head"}
    if (!collidesWithArray(newHead,walls)&&isCentered(newHead)) {
        dx = dxStored;
        dy = dyStored;
    }

    newHead = {x:snake[0].x+dx,y:snake[0].y+dy,drawType:"head"};
    testHead = {x:snake[0].x+dx*4,y:snake[0].y+dy*4,drawType:"head"}

    collidesWithWall = collidesWithArray(testHead,walls);
    collidesWithSelf = collidesWithArray(newHead,snake.slice(1)) && !powered;
    collidesWithFood = collides(newHead,food);
    collidesWithPower = collidesWithArray(newHead,powers);
    loops = newHead.x < 0 || newHead.x > 27;

    if (collidesWithWall) {
        console.log("crash");
        return;
    } else if (collidesWithSelf) {
        dx = 0;
        dy = 0;
        dxStored = 0;
        dyStored = 0;
        console.log("dead");
        return;
    } else if (collidesWithPower) {
        powered = powerTime;
        powers = powers.filter((el) => el!==collidesWithPower);
        for (let ghost of Object.values(ghosts)) {
            ghost.movement.dx*=-1;
            ghost.movement.dy*=-1;
        }
    } else if (loops) {
        newHead.x -= 28*Math.sign(newHead.x)
    }

    snake[0].drawType = "body";
    snake.unshift(newHead);
    if (collidesWithFood) {
        food = addFood();
        newTail = {x:snake[snake.length-1].x,y:snake[snake.length-1].y,drawType:"tail"}
        snake.push(newTail)
        snake.push(newTail)
        snake.push(newTail)
    } else {
        snake.pop();
        snake[snake.length-1].drawType = "tail";
    }

    
}

function moveGhost(ghost) {
    let nextStep;
    let possibleStep;
    let reverseDirection;
    let smallestDistance;
    let distanceToTarget;
    let collidesWithSnake;
    let loops;

    

    if (!powered) {
        console.log(ghost.movement.mode + ": " + ghost.movement.timeLeft)
        ghost.movement.timeLeft--;
    } else {
        console.log("frightened: " + powered)
    }

    reverseDirection = [ghost.movement.dx*-1,ghost.movement.dy*-1];
    if (!ghost.movement.timeLeft) {
        ghost.movement.dx = reverseDirection[0];
        ghost.movement.dy = reverseDirection[1];
        if (ghost.movement.mode==="chase") {
            ghost.movement.mode = "scatter";
            ghost.movement.timeLeft = scatterTime;
            ghost.target.x = ghost.target.scatterX;
            ghost.target.y = ghost.target.scatterY;
        } else if (ghost.movement.mode==="scatter") {
            ghost.movement.mode = "chase";
            ghost.movement.timeLeft = chaseTime;
        }
    }

    if (ghost.movement.mode==="chase") {
        ghost.target.x = snake[0].x;
        ghost.target.y = snake[0].y;
    }

    nextStep = {x:ghost.sprite.x+ghost.movement.dx,y:ghost.sprite.y+ghost.movement.dy,drawType:ghost.sprite.drawType};

    if (isCentered(nextStep)) {
        smallestDistance = 10000;
        for (let direction of Object.values(directions)) {
            possibleStep = {x:nextStep.x+direction[0]*4,y:nextStep.y+direction[1]*4,drawType:nextStep.drawType}
            collidesWithWall = collidesWithArray(possibleStep,walls);
            if (!collidesWithWall&&!(reverseDirection[0]===direction[0]&&reverseDirection[1]===direction[1])) {
                distanceToTarget = Math.abs(possibleStep.x-ghost.target.x)+Math.abs(possibleStep.y-ghost.target.y)
                if (distanceToTarget < smallestDistance) {
                    smallestDistance = distanceToTarget;
                    ghost.movement.dx = direction[0];
                    ghost.movement.dy = direction[1];
                }
            }
        }
    }
    
    loops = nextStep.x < 0 || nextStep.x > 27;

    if (loops) {
        nextStep.x -= 28*Math.sign(nextStep.x)
    }
    ghost.sprite = nextStep;

}

function moveGhosts() {
    for (let ghost of Object.values(ghosts)) {
        moveGhost(ghost)
    }
}

let addFood = function() {
    let foodLocation = randomFrom(space);
    let foodType = randomFrom(Object.keys(foodTypes));
    let food = {x:foodLocation.x,y:foodLocation.y,drawType:foodType}
    for (let body of snake) {
        if (collides(food,body)) {
            food = addFood();
        }
    }
    return food;
}


// DRAW FUNCTIONS

/**
 * 
 * @param {Sprite} body 
 */
function drawSnakeBody(body) {
    gridX = toGrid(body.x);
    gridY = toGrid(body.y);
    adjustment = curveDirections[body.drawType];
    ctx.beginPath();
    ctx.arc(gridX, gridY, adjustment.size, 0, 2 * Math.PI);
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
    ctx.stroke();
}

function drawFood() {
    gridX = toGrid(food.x);
    gridY = toGrid(food.y);
    ctx.beginPath();
    ctx.fillStyle = foodTypes[food.drawType];
    ctx.arc(gridX, gridY, 8, 0, 2 * Math.PI);
    ctx.fill();
}

function drawPower(power) {
    gridX = toGrid(power.x);
    gridY = toGrid(power.y);
    ctx.beginPath();
    ctx.arc(gridX, gridY, 10, 0, 2 * Math.PI);
    ctx.fill();
}

function drawGhost(ghost) {
    gridX = toGrid(ghost.sprite.x);
    gridY = toGrid(ghost.sprite.y);
    ctx.beginPath();
    ctx.fillStyle = powered ? "white" : ghost.sprite.drawType;
    ctx.arc(gridX, gridY, 15, 0, 2 * Math.PI);
    ctx.fill();
}

function drawSnake() {
    ctx.fillStyle = powered ? "rgb(252 234 63 / 70%)" : "rgb(252 234 63 / 100%)"
    for (let body of snake) {
        drawSnakeBody(body);
    }
}

function drawWalls() {
    ctx.strokeStyle = "#3E5BF5";
    ctx.lineWidth = 2.5;
    for (let wall of walls) {
        drawWall(wall);
    }
}

function drawPowers() {
    ctx.fillStyle = "orange";
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

function updateGame() {
    if (gameRunning) {
        moveSnake();
        moveGhosts();
        drawGame();
        setTimeout(updateGame,gameSpeed)
    } else {
        drawGameStart();
        setTimeout(updateGame,gameSpeed)
    }
}

function startGame() {
    gameRunning = true;
    initialiseGame()
}

initialiseGame();
updateGame();
/*grid = [
    // Row 0
    [
        {contains:"wall",drawType:"bottomToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"bottomToLeft"},
        {contains:"wall",drawType:"bottomToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"bottomToLeft"}
    ],
    //Row 1
    [
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"}
    ],
    //Row 2
    [
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"bottomToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"bottomToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"bottomToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"bottomToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"bottomToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"bottomToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"bottomToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"bottomToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"}
    ],
    //Row 3
    [
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"}
    ],
    //Row 4
    [
        {contains:"wall",drawType:"vert"},
        {contains:"nothing"},
        {contains:"wall",drawType:"topToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"topToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"topToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"topToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"topToRight"},
        {contains:"wall",drawType:"topToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"topToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"topToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"topToRight"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"horz"},
        {contains:"wall",drawType:"topToLeft"},
        {contains:"nothing"},
        {contains:"wall",drawType:"vert"}
    ],
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
]


function drawGridSquare(x,y) {
    let gridX = toGrid(x);
    let gridY = toGrid(y);
    let square = grid[y][x];
    if (square.contains === "wall") {
        let adjustment = curveDirections[square.drawType];
        ctx.moveTo(gridX+adjustment.startX, gridY+adjustment.startY);
        ctx.quadraticCurveTo(gridX, gridY, gridX+adjustment.endX, gridY+adjustment.endY);
        ctx.stroke();
    }
}

function drawGrid(level) {
    for (let y = 0; y < level.length; y++) {
        console.log(level[y].length)
        for (let x = 0; x < level[y].length; x++) {
            console.log(x + "," + y)
            drawGridSquare(x,y);
        }
    }
}
*/