// 页面逻辑
window.onload = function() {
    // 日期操作 封装一些日期常用操作
    var dateUtil = {
        /**
         * [getDetail 获取一个日期的详细信息]
         * @param  {[type]} date [必传 日期对象|时间戳|日期格式]
         * @return {[type]}      [日期相关信息]
         */
        getDetail: function (date) {
            var _date = null;

            if (date instanceof Date) {
                // 传进来的为日期对象
                _date = date;
            } else if (typeof date === 'string') {
                // 日期格式
                _date = new Date(this.switchConnectSign(date, 0));
            } else if (typeof date == 'number') {
                // 时间戳
                _date = new Date(date);
            } else {
                _date = new Date();
            }

            // 日期信息对象
            var dateInfo = {};
            // 本地当前时间
            var now = new Date();
            var date0;
            var diff;

            // 星期 数组
            var weekDayArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

            // 设置日期的起点时间
            date0 = new Date(_date.getFullYear(), _date.getMonth(), _date.getDate());
            now = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            diff = date0.getTime() - now.getTime();

            if (diff == 0) {
                dateInfo.day1 = '今天';
            } else if (diff == 86400000) {
                dateInfo.day1 = '明天';
            } else if (diff == 172800000) {
                dateInfo.day1 = '后天';
            }

            dateInfo.weekday = weekDayArr[_date.getDay()];
            dateInfo.year = _date.getFullYear();
            dateInfo.month = _date.getMonth() + 1;
            dateInfo.day = _date.getDate();
            dateInfo.hour = _date.getHours();
            dateInfo.minute = _date.getMinutes();
            dateInfo.second = _date.getSeconds();

            return dateInfo;
        },
        /**
         * [formatNum 格式化数字 将小于10以下的数字前面加0]
         * @param  {[type]} num [必传 数字]
         * @return {[type]}     [数字]
         */
        formatNum: function(num) {
            if (num < 10) {
                return '0' + num;
            }

            return num;
        },
        // 格式化日期 转成你想要的格式 例如: dateUtil.format(new Date(), 'Y-M-D H:F:S') => yyyy-mm-dd hh:ff:ss
        /**
         * [format 格式化日期 转成你想要的格式 例如: dateUtil.format(new Date(), 'Y-M-D H:F:S') => yyyy-mm-dd hh:ff:ss]
         * @param  {[type]} date      [必传 date对象|时间戳字符串|毫秒数]
         * @param  {[type]} formatStr [非必传 想要的格式 有设置默认日期格式]
         * @return {[type]}           [想要的格式]
         */
        format: function (date, formatStr) {
            var d;
            date = date || new Date();

            if (date instanceof Date) {
                // 传入Date对象
                d = date;
            } else if (typeof date === 'string') {
                // 日期格式
                d = new Date(this.switchConnectSign(date, 0));
            } else if (typeof date === 'number') {
                // 时间戳
                d = new Date(date);
            }

            if (!formatStr) {
                // 未传入格式
                formatStr = 'Y-M-D H:F:S';
            }

            var self = this;

            return formatStr.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function (v) {
                switch (v) {
                    case 'y':
                        // yyyy => yy
                        return (d.getFullYear() + '').slice(2);
                    case 'Y':
                        // yyyy
                        return d.getFullYear();
                    case 'm':
                        // m
                        return d.getMonth() + 1;
                    case 'M':
                        // mm
                        return self.formatNum(d.getMonth() + 1);
                    case 'd':
                        // d
                        return date.getDate();
                    case 'D':
                        // dd
                        return self.formatNum(d.getDate());
                    case "h":
                        // h
                        return d.getHours();
                    case "H":
                        // hh
                        return self.formatNum(d.getHours());
                    case "f":
                        // f
                        return d.getMinutes();
                    case "F":
                        // ff
                        return self.formatNum(d.getMinutes());
                    case "s":
                        // s
                        return d.getSeconds();
                    case "S":
                        // ss
                        return self.formatNum(d.getSeconds());
                }
            });
        },
        /**
         * [addTime 增加时间]
         * @param {[type]} date      [必传 日期对象|时间戳|日期格式]
         * @param {[type]} type      [必传 增加时间的格式 例如: 1D 1天 | 2H 2小时]
         * @param {[type]} formatStr [非必传 可以设置为想要的格式]
         * @return {[type]}          [日期对象|想要的日期格式]
         */
        addTime: function (date, type, formatStr) {
            var d = date || new Date();

            if (typeof d === 'string') {
                // 日期格式
                d = new Date(this.switchConnectSign(d, 0));
            } else if (typeof d === 'number') {
                // 时间戳
                d = new Date(d);
            } else if (!type || type.search(/Y|M|D|H|F|S/g) < 0) {
                return;
            }

            // 毫秒数
            var msec;
            // 数值
            var val = type.split(/Y|M|D|H|F|S/g)[0];
            // 单位
            var unit = type.substr(-1, 1);

            switch (unit) {
                case 'M':
                    //x月
                    msec = val * 30 * 24 * 60 * 60 * 1000;
                    break;
                case 'D':
                    // x天
                    msec = val * 24 * 60 * 60 * 1000;
                    break;
                case "H":
                    // x小时
                    msec = val * 60 * 60 * 1000;
                    break;
                case "F":
                    // x分钟
                    msec = val * 60 * 1000;
                    break;
                case "S":
                    // x秒
                    msec = val * 1000;
                    break;
            }

            d.setTime(d.getTime() + msec);

            if (formatStr) {
                // 需要更改格式
                return this.format(d, formatStr);
            } else {
                // 直接返回日期对象 自行处理
                return d;
            }
        },
        /**
         * [addTime 时间往前推]
         * @param {[type]} date      [必传 日期对象|时间戳|日期格式]
         * @param {[type]} type      [必传 增加时间的格式 例如: 1D 1天 | 2H 2小时]
         * @param {[type]} formatStr [非必传 可以设置为想要的格式]
         * @return {[type]}          [日期对象|想要的日期格式]
         */
        reduceTime: function (date, type, formatStr) {
            var d;
            date = date || new Date();

            if (date instanceof Date) {
                // 传入Date对象
                d = date;
            } else if (typeof date === 'string') {
                // 日期格式
                d = new Date(this.switchConnectSign(date, 0));
            } else if (typeof date === 'number') {
                // 时间戳
                d = new Date(date);
            } else if (!type || type.search(/Y|M|D|H|F|S/g) < 0) {
                return;
            }

            // 毫秒数
            var msec;
            // 数值
            var val = type.split(/Y|M|D|H|F|S/g)[0];
            // 单位
            var unit = type.substr(-1, 1);

            switch (unit) {
                case 'M':
                    //x月
                    msec = val * 30 * 24 * 60 * 60 * 1000;
                    break;
                case 'D':
                    // x天
                    msec = val * 24 * 60 * 60 * 1000;
                    break;
                case "H":
                    // x小时
                    msec = val * 60 * 60 * 1000;
                    break;
                case "F":
                    // x分钟
                    msec = val * 60 * 1000;
                    break;
                case "S":
                    // x秒
                    msec = val * 1000;
                    break;
            }

            d.setTime(d.getTime() - msec);

            if (formatStr) {
                // 需要更改格式
                return this.format(d, formatStr);
            } else {
                // 直接返回日期对象 自行处理
                return d;
            }
        },
        /**
         * [switchConnectSign 切换日期连接符 IOS只支持yyyy/mm/dd格式 不支持中划线]
         * @param {[type]} date [必传 日期 yyyy/mm/dd | yyyy-mm-dd]
         * @param {[type]} type [必传 转换类型 - => / | / => -]
         * @return {[type]} [新的日期格式]
         */
        switchConnectSign: function (date, type) {
            if (type == 0) {
                return date.replace('T', ' ').replace(/-/g, '/');
            } else if (type == 1) {
                return date.replace(/T/, ' ').replace(/\//g, '-');
            }
        },
        /**
         * [compare 比较两个日期大小]
         * @param {[type]} date1 [必传 日期 | 日期格式字符串 | 时间戳]
         * @param {[type]} date2 [必传 日期 | 日期格式字符串 | 时间戳]
         * @return {[type]} [数字 -1 前面小于后面 | 0 前面等于后面 | 1 前面大于后面]
         */
        compare: function (date1, date2) {
            var timestamp1;
            var timestamp2;

            if (date1 instanceof Date) {
                // 日期
                timestamp1 = date1.getTime();
            } else if (typeof date1 === 'string') {
                // 日期格式
                timestamp1 = new Date(this.switchConnectSign(date1, 0)).getTime();
            } else if (typeof date1 === 'number') {
                // 时间戳
                timestamp1 = date1;
            } else {
                return;
            }

            if (date2 instanceof Date) {
                // 日期
                date2 = date2.getTime();
            } else if (typeof date2 === 'string') {
                // 日期格式
                timestamp2 = new Date(this.switchConnectSign(date2, 0)).getTime();
            } else if (typeof date2 === 'number') {
                // 时间戳
                timestamp2 = date2;
            } else {
                return;
            }

            if (timestamp1 < timestamp2) {
                // 前面时间小
                return -1;
            } else if (timestamp1 > timestamp2) {
                // 前面时间大
                return 1;
            } else {
                // 时间相等
                return 0;
            }
        }
    };

    // 模拟数据
    var params = {
        // 控制tab显示 0 只有接站 | 1 只有送站 | 2 接送站
        "flag": 2,
        // 微信openId
        "openId": "1",
        // 车次
        "trainNo": "c2996",
        // 出发时间
        "startTime": "2018-01-09 21:00",
        // 到达时间
        "arriveTime": "2018-01-10 02:30",
        // 出发信息
        "start": {
            // 火车站三字码
            "airCode": "_SZH",
            // 出发站
            "station": "苏州站",
            // 出发城市id
            "cityId": "226",
            // 出发城市名
            "cityName": "苏州",
            // 出发站经度
            "lon": "120.610885",
            // 出发站纬度
            "lat": "31.329258"
        },
        // 到达信息
        "arrive": {
            // 火车站三字码
            "airCode": "_AOH",
            // 到达站
            "station": "上海虹桥站",
            // 到达城市id
            "cityId": "321",
            // 到达城市名
            "cityName": "上海",
            // 到达站经度
            "lon": "121.320561",
            // 到达站纬度
            "lat": "31.194567"
        }
    };

    // 页面功能
    var page = {
        // 当前产品id 13接站(默认) | 14送站
        curProductId: 13,
        // 渲染页面
        renderDOM: function() {
            var dom = '<div id="usecar">'
                + '<div class="uc-main">'
                +    '<h2 class="uc-title uc-c-333 uc-fs-16px uc-lh-16px">专车接送</h2>'
                +    '<ul class="uc-tab uc-bt-05px uc-d-flex uc-c-666">'
                +        '<li class="uc-tab-item uc-tab-jie uc-fs-16px uc-f-1 uc-o-hidden">到<span class="uc-station uc-station-jie"></span>接我</li>'
                +        '<li class="uc-tab-item uc-tab-song uc-fs-16px uc-f-1 uc-o-hidden">送我到<span class="uc-station uc-station-song"></span></li>'
                +    '</ul>'
                +    '<ul class="uc-product">'
                +        '<li class="uc-product-item uc-product-jie">'
                +            '<div class="uc-box1">'
                +                '<div class="uc-time-box uc-time-box-jie uc-bb-05px">'
                +                    '<div class="uc-time uc-time-jie uc-fs-16px uc-lh-16px uc-c-333"></div>'
                +                    '<div class="uc-time-notice uc-fs-12px uc-lh-12px uc-c-666"><span class="uc-train-no-jie"></span>预计<span class="uc-arrive-time"></span>到达</div>'
                +                '</div>'
                +                '<div class="uc-address-box uc-arrive-box">'
                +                    '<div class="uc-fs-16px uc-lh-16px uc-c-ccc">您要去哪儿</div>'
                +                    '<div class="uc-fs-16px uc-lh-16px uc-c-333 uc-to-ellipsis uc-none"></div>'
                +                '</div>'
                +            '</div>'
                +            '<div class="uc-bt-05px uc-amount-box">'
                +                '<div class="uc-amount-default-box uc-none">'
                +                    '<div class="uc-amount-default">'
                +                        '<span class="uc-fs-14px uc-lh-14px uc-c-333">一口价</span>'
                +                        '<span class="uc-fs-14px uc-lh-12px uc-c-ff6633 uc-ml-6px">&yen;</span>'
                +                        '<span class="uc-fs-22px uc-lh-16px uc-c-ff6633">10</span>'
                +                        '<span class="uc-fs-14px uc-lh-14px uc-c-333 uc-ml-6px">起</span>'
                +                    '</div>'
                +                    '<div class="uc-amount-notice uc-fs-12px uc-lh-12px uc-c-666">一口价含过路费高速费等所有费用，提供发票</div>'
                +                '</div>'
                +                '<div class="uc-amount-actual-box">'
                +                    '<div class="uc-amount-actual">'
                +                        '<span class="uc-fs-14px uc-lh-14px uc-c-333">一口价</span>'
                +                        '<span class="uc-fs-14px uc-lh-12px uc-c-ff6633 uc-ml-6px">&yen;</span>'
                +                        '<span class="uc-amount uc-fs-22px uc-lh-16px uc-c-ff6633">40</span>'
                +                    '</div>'
                +                    '<div class="uc-amount-notice uc-fs-12px uc-lh-12px uc-c-666">滴滴专车提供本次用车服务</div>'
                +                    '<div class="uc-select uc-select-off"></div>'
                +                '</div>'
                +            '</div>'
                +        '</li>'
                +        '<li class="uc-product-item uc-product-song">'
                +            '<div class="uc-box1">'
                +                '<div class="uc-time-box uc-time-box-song uc-bb-05px">'
                +                    '<div class="uc-time uc-time-song uc-fs-16px uc-lh-16px uc-c-333"></div>'
                +                    '<div class="uc-time-notice uc-fs-12px uc-lh-12px uc-c-666"><span class="uc-train-no-song"></span>预计<span class="uc-start-time"></span>发车</div>'
                +                '</div>'
                +                '<div class="uc-address-box uc-start-box">'
                +                    '<div class="uc-fs-16px uc-lh-16px uc-c-ccc">您在哪上车</div>'
                +                    '<div class="uc-fs-16px uc-lh-16px uc-c-333 uc-to-ellipsis uc-none"></div>'
                +                '</div>'
                +            '</div>'
                +            '<div class="uc-bt-05px uc-amount-box">'
                +                '<div class="uc-amount-default-box uc-none">'
                +                    '<div class="uc-amount-default">'
                +                        '<span class="uc-fs-14px uc-lh-14px uc-c-333">一口价</span>'
                +                        '<span class="uc-fs-14px uc-lh-12px uc-c-ff6633 uc-ml-6px">&yen;</span>'
                +                        '<span class="uc-fs-22px uc-lh-16px uc-c-ff6633">10</span>'
                +                        '<span class="uc-fs-14px uc-lh-14px uc-c-333 uc-ml-6px">起</span>'
                +                    '</div>'
                +                    '<div class="uc-amount-notice uc-fs-12px uc-lh-12px uc-c-666">一口价含过路费高速费等所有费用，提供发票</div>'
                +                '</div>'
                +                '<div class="uc-amount-actual-box">'
                +                    '<div class="uc-amount-actual">'
                +                        '<span class="uc-fs-14px uc-lh-14px uc-c-333">一口价</span>'
                +                        '<span class="uc-fs-14px uc-lh-12px uc-c-ff6633 uc-ml-6px">&yen;</span>'
                +                        '<span class="uc-amount uc-fs-22px uc-lh-16px uc-c-ff6633">40</span>'
                +                    '</div>'
                +                    '<div class="uc-amount-notice uc-fs-12px uc-lh-12px uc-c-666">滴滴专车提供本次用车服务</div>'
                +                    '<div class="uc-select uc-select-off"></div>'
                +                '</div>'
                +            '</div>'
                +        '</li>'
                +    '</ul>'
                +'</div>'
                +'<p class="uc-user-notice uc-fs-12px uc-lh-12px uc-c-33cc66">用户须知</p>'
            +'</div>';

            $('.huoche').html(dom);
        },
        // 根据参数配置页面
        configPage: function() {
            if (params.flag == 0) {
                // 只有接站

                this.$tabSong.addClass("uc-none");
                this.$proSong.addClass("uc-none");
                // 将当前产品id改为接站
                this.curProductId = 13;

                // 填充接dom
                this.fillJieDom();
            } else if (params.flag == 1) {
                // 只有送站

                this.$tabJie.addClass("uc-none");
                this.$proJie.addClass("uc-none");
                // 将当前产品id改为送站
                this.curProductId = 14;

                // 填充tab
                $(".uc-station-song").html(params.start.station);

                // 填充送dom
                this.fillSongDom();
            } else {
                // 接送站

                // 将当前产品id改为接站
                this.curProductId = 13;

                // 填充接dom
                this.fillJieDom();
                
                // 填充送dom
                this.fillSongDom();
            }
        },
        // 填充接dom
        fillJieDom: function() {
            // 填充tab
            $(".uc-station-jie").html(params.arrive.station);
            // 接站时间
            var arriveTime = dateUtil.format(params.arriveTime, "M月D日 H:F");
            $(".uc-time-jie").html(arriveTime);

            // 接站时间提示
            $(".uc-train-no-jie").html(params.trainNo);
            $(".uc-arrive-time").html(arriveTime);
        },
        // 填充送dom
        fillSongDom: function() {
            // 填充tab
            $(".uc-station-song").html(params.start.station);
            // 送站时间
            var startTime = dateUtil.format(params.startTime, "M月D日 H:F");
            // 默认送站时间 为火车出发时间往前推两小时
            var timeSong = dateUtil.reduceTime(params.startTime, "2H", "M月D日 H:F");
            $(".uc-time-song").html(timeSong);

            // 送站时间提示
            $(".uc-train-no-song").html(params.trainNo);
            $(".uc-start-time").html(startTime);
        },
        // 切换tab
        switchTab: function() {
            var self = this;

            // 点击接站tab
            this.$tabJie.on("click", function() {
                if (!$(this).hasClass("uc-tab-item-on")) {
                    // 将当前产品id改为接站
                    self.curProductId = 13;
                    // 配置tab和当前产品显示
                    self.configTab();
                }
            });

            // 点击送站tab
            this.$tabSong.on("click", function() {
                if (!$(this).hasClass("uc-tab-item-on")) {
                    // 将当前产品id改为送站
                    self.curProductId = 14;
                    // 配置tab和当前产品显示
                    self.configTab();
                }
            });
        },
        // 配置tab和当前产品显示
        configTab: function() {
            if (this.curProductId == 13) {
                // 接站
                this.$tabJie.addClass("uc-tab-item-on");
                this.$tabSong.removeClass("uc-tab-item-on");

                this.$proJie.removeClass("uc-none");
                this.$proSong.addClass("uc-none");
            } else {
                // 送站
                this.$tabJie.removeClass("uc-tab-item-on");
                this.$tabSong.addClass("uc-tab-item-on");

                this.$proJie.addClass("uc-none");
                this.$proSong.removeClass("uc-none");
            }
        },
        // 时间控件
        timePick: function() {
            var timepick1 = $.timePick({
                startDate: "2016-12-17 15:50",
                endDate: "2016-12-23 16:50",
                normalDate: "2016-12-22 16:50", 
                timeInterval: "10",
                btnPosition: 'top',
                title: "选择用车时间",
                selectFn: function(data){
                    console.log(data)
                }
            });

            $(".uc-time-box-jie").off("click").on("click", function() {
                timepick1.open();
            });
        },
        // 点击地址
        clickAddress: function() {
            var self = this;

            $(".uc-arrive-box").on("click", function() {
                if (self.$selectAddrJie.hasClass("uc-none")) {
                    self.$selectAddrJie.removeClass("uc-none");
                }
            });
        },
        // input事件
        inputEvent: function() {
            var self = this;

            this.$inputJie.on("input", function() {
                var _val = $(this).val();

                if (_val) {
                    self.$delJie.removeClass("uc-none");
                } else {
                    self.$delJie.addClass("uc-none");
                }
            });
        },
        // 清空值
        cleanValue: function() {
            var self = this;

            this.$delJie.on("click", function() {
                self.$inputJie.val("");
                $(this).addClass("uc-none");
            });
        },
        // 切换用车按钮
        switchUseCar: function() {
            $(".uc-select-jie").on("click", function() {
                if ($(this).hasClass("uc-select-on")) {
                    $(this).removeClass("uc-select-on");
                    $(this).addClass("uc-select-off");
                } else {
                    $(this).removeClass("uc-select-off");
                    $(this).addClass("uc-select-on");
                }
            });
        },
        // 初始化
        init: function() {
            // 渲染dom 先在页面改好样式，然后把dom复制到这个方法里 放开注释
            // this.renderDOM();

            // tab dom
            this.$tabJie = $(".uc-tab-jie");
            this.$tabSong = $(".uc-tab-song");
            // product dom
            this.$proJie = $(".uc-product-jie");
            this.$proSong = $(".uc-product-song");
            // select address dom
            this.$selectAddrJie = $(".uc-select-address-box-jie");

            // input dom
            this.$inputJie = $(".uc-address-input-jie");

            // del dom
            this.$delJie = $(".uc-address-del-jie");

            // 配置页面
            this.configPage();
            // 配置tab和当前产品显示
            this.configTab();
            // 绑定事件
            this.switchTab();

            // 时间组件样式存在问题 找小明
            this.timePick();
            // 点击地址
            this.clickAddress();
            // input事件
            this.inputEvent();
            // 清除值
            this.cleanValue();
            // 切换用车按钮
            this.switchUseCar();
        }
    };

    // by tsl19984 获取接口数据
    var Ajax = {
        // 获取服务器时间
        getDateTime: function() {
            var params = {
            };
            
            var dataStr = JSON.stringify({
                requrl: "http://wx.qa.17u.cn/CarWeiXin/carorder",
                servicename: 'getusetime',
                reqbody: params,
                "iscache": "0"
            });

            $.ajax({
                url: "http://wx.qa.17u.cn/CarWeiXin/carorder/getusetime",
                type: "POST",
                data: dataStr,
                success: function(data) {
                    var cbData = JSON.parse(data),
                        response = cbData.response,
                        body = response.body,
                        header = response.header;

                    // 假数据 start
                    header.rspCode = "0000";
                    body = {
                        "clientinfo":null,
                        "error":null,
                        "useTimeModel":{
                            "startTime":"2018-01-05 17:21",
                            "endTime":"2018-04-05 17:21",
                            "currentYear":"2018",
                            "currentTime":"2018-01-05 17:21:51"
                        }
                    }
                    // 假数据 end
                    
                    if (header.rspCode == "0000") {//请求成功
                        //具体的逻辑
                        console.log(body);
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            })
        },
        // 地址联想
        getBlurAddress: function() {
            var params = {
                'cityId': 321,
                'keyWord': '新'
            };

            var dataStr = JSON.stringify({
                requrl: "http://wx.qa.17u.cn/CarWeiXin/carorder",
                servicename: 'getlocation',
                reqbody: params,
                "iscache": "0"
            });

            $.ajax({
                url: "http://wx.qa.17u.cn/CarWeiXin/carorder/getlocation",
                type: "POST",
                data: dataStr,
                success: function(data) {
                    var cbData = JSON.parse(data),
                        response = cbData.response,
                        body = response.body,
                        header = response.header;

                    // 假数据 start
                    header.rspCode = "0000";
                    body = {
                        "placeList":[
                            {
                                "id":"BV10039784",
                                "name":"新天地(地铁站)",
                                "district":"上海市黄浦区",
                                "adcode":"310101",
                                "location":"121.475182,31.216367",
                                "address":"10号线;13号线",
                                "longitude":"121.475182",
                                "latitude":"31.216367"
                            },
                            {
                                "id":"B001539A1D",
                                "name":"新世界城",
                                "district":"上海市黄浦区",
                                "adcode":"310101",
                                "location":"121.473656,31.235118",
                                "address":"南京西路2-68号",
                                "longitude":"121.473656",
                                "latitude":"31.235118"
                            },
                            {
                                "id":"BV10039891",
                                "name":"新闸路(地铁站)",
                                "district":"上海市黄浦区",
                                "adcode":"310101",
                                "location":"121.468151,31.238373",
                                "address":"1号线",
                                "longitude":"121.468151",
                                "latitude":"31.238373"
                            },
                            {
                                "id":"B00155KUM0",
                                "name":"上海新天地(马当路)",
                                "district":"上海市黄浦区",
                                "adcode":"310101",
                                "location":"121.47495,31.219921",
                                "address":"太仓路181弄",
                                "longitude":"121.47495",
                                "latitude":"31.219921"
                            },
                            {
                                "id":"B00155L0YG",
                                "name":"新天地时尚·购物中心",
                                "district":"上海市黄浦区",
                                "adcode":"310101",
                                "location":"121.475125,31.21755",
                                "address":"马当路245号",
                                "longitude":"121.475125",
                                "latitude":"31.21755"
                            },
                            {
                                "id":"B00155KEIX",
                                "name":"上海交通大学医学院附属新华医院",
                                "district":"上海市杨浦区",
                                "adcode":"310110",
                                "location":"121.517798,31.273252",
                                "address":"控江路1665号",
                                "longitude":"121.517798",
                                "latitude":"31.273252"
                            },
                            {
                                "id":"BV10039866",
                                "name":"新村路(地铁站)",
                                "district":"上海市普陀区",
                                "adcode":"310107",
                                "location":"121.422682,31.263952",
                                "address":"7号线",
                                "longitude":"121.422682",
                                "latitude":"31.263952"
                            },
                            {
                                "id":"BV10027172",
                                "name":"新场(地铁站)",
                                "district":"上海市浦东新区",
                                "adcode":"310115",
                                "location":"121.648980,31.045561",
                                "address":"16号线",
                                "longitude":"121.648980",
                                "latitude":"31.045561"
                            }
                        ],
                        "msg":null,
                        "success":true,
                        "strideCity":false,
                        "cityId":null,
                        "cityName":null
                    }
                    // 假数据 end
                    
                    if (header.rspCode == "0000") {//请求成功
                        //具体的逻辑
                        console.log(body);
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            })
        },
        // 获取预估价
        getCarPrice: function() {
            var params = {
                'memberId': 'oOCyauGJyquRcVDoeU8N4gGQz4m0',
                'platform': 'WeChat',
                'distributorCd': 'DeliveryTrainTicket',
                'productId': 14,
                'startCityId': 321,
                'endCityId': 321,
                'startAddress': '上海站',
                'startAddressDetail': '上海站',
                'startLongitude': '121.45575',
                'startLatitude': '31.249571',
                'endAddress': '上海绿地万豪酒店',
                'endAddressDetail': '',
                'endLongitude': '121.47283',
                'endLatitude': '31.192172',
                'carUseTimeStr': '2018-01-07 12:30',
                'landmarkNo': '',
                'flightNo': '',
                'flightDateStr': ''
            };

            // 新接口这块必写 params不能是空对象 老接口可以不要reqbody
            var paramsArray = [], reqbody;
            for (var o in params) {
                paramsArray.push('"' + o + '":' + '"' + params[o] + '"');
            }
            reqbody = encodeURIComponent(paramsArray.join(","));

            var dataStr = JSON.stringify({
                requrl: "http://wx.qa.17u.cn/CarDistributionMobileWebApi/distribution",
                servicename: 'estimateprice',
                reqbody: reqbody,
                "iscache": "0"
            });

            $.ajax({
                url: "http://wx.qa.17u.cn/CarDistributionMobileWebApi/distribution/estimateprice",
                type: "POST",
                data: dataStr,
                success: function(data) {
                    var cbData = JSON.parse(data),
                        response = cbData.response,
                        body = response.body,
                        header = response.header;

                    // 假数据 start
                    header.rspCode = "0000";
                    body = {
                        "price":27,
                        "priceEstimateMark":"32391cee-1107-40b5-aaba-bfd42020651d"
                    }
                    // 假数据 end
                    
                    if (header.rspCode == "0000") {//请求成功
                        //具体的逻辑
                        console.log(body);
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }
    }

    Ajax.getDateTime();
    Ajax.getBlurAddress();
    Ajax.getCarPrice();

    // 页面初始化
    page.init();
};