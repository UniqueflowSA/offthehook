# Simple MD blog

### React + TS + Vite

안녕하세요!
개인프로젝트로 만든 md블로그입니다.  
일반포스트와 목차가 있는 시리즈 포스트를 작성할 수 있습니다.  
/notes/metadata.json을 통해서 리스트데이터를 구성할 수 있습니다.

```
{
    "title": "사용자 경험 개선을 위한 방법", <!-- 노출되는 포스트 제목 -->
    "summary": "사용자 경험(UX)을 개선하기 위한 다양한 방법과 전략", <!-- 제목아래 표시되는 부가설명 -->
    "date": "2024-01-20", <!--  제목아래 표시되는 날짜-->
    "category": "blabla", <!--표시되는 카테고리 및 경로 중 폴더 명 -->
    "slug": "2", <!-- 읽어올 md의 파일명 -->
    "imgurl": "https://media.giphy.com/media/1zkVuO55wfgDC/giphy.gif?cid=ecf05e47uudqpl6ujlelusiwqrd4ar0qb39wzrgtp23d2fdk&ep=v1_gifs_search&rid=giphy.gif&ct=g" <!-- 리스트 썸네일 및 포스트 타이틀의 사진 -->
  },
  <!-- 파일경로는 /notes/category/slug.md로 하시면됩니다.
  예를들면 해당 파일의 경로는 /notes/blabla/2.md가 됩니다.-->
```

## 구글 스프레드시트를 이용한 댓글

### Google Sheets + Apps Script

구글은 신이야.  
스프레드시트와 앱스스크립트를 이용해서
간단 댓글을 구현했습니다.

포스트의 파일명(slug)가 하나의 댓글 시트입니다.

```
<!-- appsScript 코드 -->
const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
function doGet(e){
  // 이 부분에서 받아온 post를 가지고 두가지 동작
  const postSheetName = e.parameter.post
  // 1. postSheetName에 해당하는 시트를 찾아서 연다.
  const sheet =  spreadsheet.getSheetByName(postSheetName)
  // 2. 없으면 시트를 새로판다.
  if(!sheet){
    sheet =  spreadsheet.insertSheet(postSheetName);
  }
  var data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const jsonData = JSON.parse(e.postData.contents);
  const action =  jsonData.action;
  const data= jsonData.data
  const post = jsonData.post
  const sheet =  spreadsheet.getSheetByName(post)

  if(action === "create"){
     return createData(data, sheet)
  }
  else if(action === "remove"){
    return removeData(data, sheet)
  }
}


function createData(data, sheet){
  try {
    //이 부분에서 sheet를 참조해서 코멘트 저장
    var lastRow = sheet.getLastRow() + 1;

    sheet.getRange(lastRow, 1).setValue(data.commentsId);
    sheet.getRange(lastRow, 2).setValue(data.nickname);
    sheet.getRange(lastRow, 3).setValue(data.password);
    sheet.getRange(lastRow, 4).setValue(data.content);
    sheet.getRange(lastRow, 5).setValue(data.date);

     return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setStatusCode(200)
    .setHeader('Access-Control-Allow-Origin', '*');
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({"result":"error", "error": error}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function removeData(data, sheet){
  try {
    const targetKey  = data
  const lastRow = sheet.getLastRow();
    const range = sheet.getRange(1,1,lastRow,1)
    //반복문으로 데이터조회 및 해당행 삭제
    for(let i = lastRow; i>0; i--){
      if(range.getCell(i, 1).getValue() === targetKey){
        sheet.deleteRow(i)
      }
    }
    return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setStatusCode(200)
    .setHeader('Access-Control-Allow-Origin', '*')

}catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({"result":"error", "error": error}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


```

doGet()은 데이터를 받아오고 파일명(slug)에 해당하는 댓글 시트가 있는지, 없다면 새로운 댓글 시트를 생성합니다.
doPost()는 전달되는 body.action에 따라 댓글 생성, 삭제를 수행합니다.

```
  const onGet = () => {
    //시트 데이터 가져오기
  fetch(
      `URL?post=${slug}`,
      {
        method: "GET",
      }
    )

 const onRemove = (key: number) => {
    //댓글 삭제기능
    fetch(
      "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
      {
        method: "POST",
        body: JSON.stringify({
          action: "remove",
          data: key,
          post: slug,
        }),
      }
    )


const fetchCreateComments = async () => {
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
          {
            method: "POST",
            body: JSON.stringify({
              action: "create",
              data: commentsState.newCommentsData,
              post: slug,
            }),
          }

```
