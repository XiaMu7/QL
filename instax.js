// [rewrite_local]
// 这里的 URL 请根据实际情况调整，确保匹配到需要获取信息的接口
// 目前匹配了包含 /user/ 路径的接口，你可能需要更精确的匹配
// ^https:\/\/instax.app.xcxd.net.cn\/api\/user\/.* url script-response-body get_info.js

// get_info.js
// 获取响应体和请求 URL
let responseBody = $response.body;
let url = $request.url;

try {
    // 尝试将响应体解析为 JSON 格式（假设响应是 JSON）
    let jsonData = JSON.parse(responseBody);

    // 尝试从 JSON 数据中提取 uid、user_id 和 Authorization（auth）
    let uid = jsonData.uid || '未找到 uid';
    let userId = jsonData.user_id || '未找到 user_id';
    let auth = jsonData.Authorization || '未找到 auth';

    // URL 解码（如果需要）
    uid = decodeURIComponent(uid);
    userId = decodeURIComponent(userId);
    auth = decodeURIComponent(auth);

    // 将提取并解码后的信息放入剪贴板
    $clipboard = `uid: ${uid}\nuser_id: ${userId}\nauth: ${auth}`;

    // 发送通知告知信息获取结果
    $notify('信息获取成功', '获取到的信息:', `uid: ${uid}\nuser_id: ${userId}\nauth: ${auth}`);
} catch (error) {
    // 如果解析 JSON 失败，打印错误信息并发送通知
    console.log('解析响应体失败:', error);
    $notify('信息获取失败', '错误信息:', '解析响应体失败，请检查接口返回数据');
}

$done({});