const canvas = document.getElementById("game-space");
const ctx = canvas.getContext("2d");

grid = [
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
]

const wallTypes = {
    vert:{startX:0,startY:-10,endX:0,endY:10},
    horz:{startX:-10,startY:0,endX:10,endY:0},
    topToLeft:{startX:0,startY:-10,endX:-10,endY:0},
    topToRight:{startX:0,startY:-10,endX:10,endY:0},
    bottomToLeft:{startX:0,startY:10,endX:-10,endY:0},
    bottomToRight:{startX:0,startY:10,endX:10,endY:0}
}

var toGrid = coord => coord*20+10;

/**
 * A function that draws what is in a square onto the game grid
 * @param {number} x coordinate
 * @param {number} y coordinate
 */
function drawGridSquare(x,y) {
    let gridX = toGrid(x);
    let gridY = toGrid(y);
    let square = grid[y][x];
    if (square.contains === "wall") {
        let adjustment = wallTypes[square.drawType];
        ctx.moveTo(gridX+adjustment.startX, gridY+adjustment.startY);
        ctx.quadraticCurveTo(gridX, gridY, gridX+adjustment.endX, gridY+adjustment.endY);
        ctx.stroke();
    }
}

/**
 * A function that draws all the squares of the game grid
 * @param {Array} level An array of what is in the grid
 */
function drawGrid(level) {
    for (let y = 0; y < level.length; y++) {
        console.log(level[y].length)
        for (let x = 0; x < level[y].length; x++) {
            console.log(x + "," + y)
            drawGridSquare(x,y);
        }
    }
}

/*
function drawWall(wall) {
    let gridX = toGrid(wall.x);
    let gridY = toGrid(wall.y);
    let adjustment = wallTypes[wall.drawType];
    ctx.moveTo(gridX+adjustment.startX, gridY+adjustment.startY);
    ctx.quadraticCurveTo(gridX, gridY, gridX+adjustment.endX, gridY+adjustment.endY);
    ctx.stroke();
}

function drawWalls(level) {
    ctx.beginPath();
    ctx.strokeStyle = "#3E5BF5";
    ctx.lineWidth = 2.5;
    for (let wall of walls) {
        drawWall(wall);
    }
}


drawWalls(walls);
ctx.beginPath();
ctx.arc(280, 470, 15, 0, 2 * Math.PI);
ctx.fillStyle = "green";
ctx.fill();

*/

ctx.beginPath();
ctx.strokeStyle = "#3E5BF5";
ctx.lineWidth = 2.5;
drawGrid(grid);

