const professionList = [
  {
    YfeOqp2: {
      profession: "physicist and chemist",
      award: "(Miyake Prize for geochemistry, Tanaka Prize)",
      discoverd: "a method for measuring carbon dioxide in seawater",
    },
  },
  {
    szV5sdG: {
      profession: "physicist and chemist",
      award:
        "(Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)",
      discoverd: "polonium (chemical element)",
    },
  },
];
const imageId = "YfeOqp2";
professionList.map((eachProfessor) => {
  <li>console.log({eachProfessor[imageId].profession})</li>;
});
