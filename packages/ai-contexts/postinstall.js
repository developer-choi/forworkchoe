import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 이 스크립트 파일(postinstall.js)의 현재 경로
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 재귀적으로 폴더 구조를 복사하는 함수
function copyRecursive(source, target, rootSource) {
  let copiedCount = 0;
  // 최초 호출 시 rootSource 설정
  if (!rootSource) {
    rootSource = source;
  }

  // 대상 폴더가 없으면 생성
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // 원본 폴더의 모든 항목을 읽음
  const items = fs.readdirSync(source);

  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      // 디렉토리면 재귀적으로 복사
      copiedCount += copyRecursive(sourcePath, targetPath, rootSource);
    } else {
      // 파일이면 복사
      fs.copyFileSync(sourcePath, targetPath);
      copiedCount++;
      // 상대 경로로 표시 (root부터의 경로)
      const relativePath = path.relative(rootSource, sourcePath);
      console.log(`[ai-contexts] Copied: ${relativePath}`);
    }
  });

  return copiedCount;
}

// 1. 원본 폴더 경로 (패키지 내부의 docs 폴더)
const sourceDir = path.resolve(__dirname, 'docs');

// 2. 대상 폴더 경로 (설치되는 프로젝트의 docs/gemini)
// postinstall 스크립트는 node_modules/@forworkchoe/ai-contexts 안에서 실행됩니다.
// '../../..'는 node_modules/@forworkchoe/ai-contexts 3단계 위인 프로젝트 루트를 가리킵니다.
const projectRoot = path.resolve(__dirname, '..', '..', '..');
const targetDir = path.join(projectRoot, 'docs', 'gemini');

// 3. 폴더 및 파일 복사
try {
  // 프로젝트 루트가 맞는지 간단히 확인 (안전장치)
  if (projectRoot.includes('node_modules')) {
    console.warn('[ai-contexts] Could not determine project root. Aborting copy.');
    process.exit(0);
  }

  const copiedCount = copyRecursive(sourceDir, targetDir);

  console.log(`[ai-contexts] Successfully copied ${copiedCount} file(s) to docs/gemini/`);
} catch (err) {
  console.error('[ai-contexts] Error copying context files:', err);
  process.exit(1);
}
