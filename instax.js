// 定义重写规则函数
function rewriteScript(context) {
    const url = context.requestUrl;
    const responseBody = context.responseBody;
    if (url.startsWith('https://instax.app.xcxd.net.cn/api')) {
        try {
            const jsonData = JSON.parse(responseBody);
            let uid = jsonData.uid;
            let userId = jsonData.user_id;
            let auth = jsonData.Authorization;

            let message = '';
            if (uid) {
                message += `uid: ${uid}\n`;
            }
            if (userId) {
                message += `user_id: ${userId}\n`;
            }
            if (auth) {
                message += `Auth: ${auth}\n`;
            }

            if (message) {
                // 弹窗提醒
                context.$notification.post('获取到相关信息', '', message, {
                    'update-pasteboard': message,  // 将信息设置到剪贴板，方便复制
                    'auto-dismiss': 10  // 10秒后自动关闭弹窗
                });
            }
        } catch (e) {
            // 解析数据出错时的处理
            console.log(`解析响应数据出错: ${e}`);
        }
    }
    return responseBody;
}

// 导出重写规则
$httpClient.onResponseComplete(rewriteScript);
