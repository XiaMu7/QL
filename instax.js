// [rewrite_local]
// ����� URL �����ʵ�����������ȷ��ƥ�䵽��Ҫ��ȡ��Ϣ�Ľӿ�
// Ŀǰƥ���˰��� /user/ ·���Ľӿڣ��������Ҫ����ȷ��ƥ��
// ^https:\/\/instax.app.xcxd.net.cn\/api\/user\/.* url script-response-body get_info.js

// get_info.js
// ��ȡ��Ӧ������� URL
let responseBody = $response.body;
let url = $request.url;

try {
    // ���Խ���Ӧ�����Ϊ JSON ��ʽ��������Ӧ�� JSON��
    let jsonData = JSON.parse(responseBody);

    // ���Դ� JSON ��������ȡ uid��user_id �� Authorization��auth��
    let uid = jsonData.uid || 'δ�ҵ� uid';
    let userId = jsonData.user_id || 'δ�ҵ� user_id';
    let auth = jsonData.Authorization || 'δ�ҵ� auth';

    // URL ���루�����Ҫ��
    uid = decodeURIComponent(uid);
    userId = decodeURIComponent(userId);
    auth = decodeURIComponent(auth);

    // ����ȡ����������Ϣ���������
    $clipboard = `uid: ${uid}\nuser_id: ${userId}\nauth: ${auth}`;

    // ����֪ͨ��֪��Ϣ��ȡ���
    $notify('��Ϣ��ȡ�ɹ�', '��ȡ������Ϣ:', `uid: ${uid}\nuser_id: ${userId}\nauth: ${auth}`);
} catch (error) {
    // ������� JSON ʧ�ܣ���ӡ������Ϣ������֪ͨ
    console.log('������Ӧ��ʧ��:', error);
    $notify('��Ϣ��ȡʧ��', '������Ϣ:', '������Ӧ��ʧ�ܣ�����ӿڷ�������');
}

$done({});