import express from 'express'; // express 모듈을 가져오기
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url); // 현재 실행중인 파일 경로
const __dirname = dirname(__filename); // 해당 경로에서 디렉토리 경로만 획득
const buildPath = join(__dirname, 'storage', 'dist');
const publicPath = join(__dirname, 'storage', 'public');
console.log(__filename, __dirname, buildPath, publicPath);

const app = express(); // Express 애플리케이션 인스턴스를 생성
app.use('/', express.static(buildPath));
app.use('/image', express.static(publicPath));

// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행
app.get('/api/hi', (request, response) => {
    // 클라이언트에게 문자열 '안녕 익스프레스!'를 응답
    response.send(`안녕 익스프레스! ${process.env.APP_NAME}`);
});
app.get('/api/test', (request, response) => {
    // 클라이언트에게 문자열 '안녕 익스프레스!'를 응답
    response.send(`test ${process.env.APP_NAME}`);
});

app.all(/^\/api\/.*/, (request, response) => {
    response.send('404 Not Found');
});

app.get(/^.*/, (request, response) => {
    response.sendFile(join(buildPath, 'index.html'));
});

// 서버를 주어진 포트에서 시작
app.listen(3000, () => {
    console.log(`${3000} 포트 리스닝`);
});