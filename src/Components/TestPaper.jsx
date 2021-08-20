export default function TestPaper({ testId, testInfo }) {
  return (
    <div
      className="w-1/2 border-solid border-2 border-gray-100 shadow-xl flex items-center flex-col p-4"
      style={{ minHeight: "95%" }}
    >
      <h1 className="text-4xl">{testInfo.testTitle}</h1>
      <p className="text-lg">{testInfo.testDescription}</p>
    </div>
  );
}
