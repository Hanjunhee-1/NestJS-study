export function getKST() {
  // 한국의 시간을 UTC 시간으로 표시하면 9시간 이전으로 표시가 됩니다.
  // KST 로 표시하면 UTC 표기방식을 따르는 prisma 에서 사용하기 불편하기 때문에
  // 한국의 시간을 UTC 시간으로 표시하면서 현재의 시간을 정확하게 표시할 수 있는 함수를 만들었습니다.

  // 현재 시간을 가져옵니다. 어처피 UTC 로 표기하기 떄문에 그냥 사용해도 됩니다.
  const utc = new Date();

  // utc 시간의 시간 부분만 가져와서 9를 더해줍니다. 한국은 UTC+9 이기 때문.
  // 더한 결과를 utc.setHours() 의 매개변수로 줍니다.
  const kst = utc.setHours(utc.getHours() + 9);

  // kst 는 datetime 표기방식으로 되어있지 않고 해당 시간을 초로 계산 결과만이 들어있습니다. 때문에 다시 Date() 로 묶어서 반환합니다.
  return new Date(kst);
}
