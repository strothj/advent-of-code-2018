const part1TestCase = `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`.split("\n");
const expected = 12;

describe("Day 2 Part 1", () => {
  it("produces correct result for test case", () => {
    expect(day2Part1(part1TestCase)).toBe(expected);
  });

  it("produces correct result from input", () => {
    expect(day2Part1(getDay2Input())).toBe(6175);
  });
});

function day2Part1(idList: string[]): number {
  const duplicateCounts = idList
    .map(id => {
      const seenLetters = new Set<string>();
      let hasSeenTwo = false;
      let hasSeenThree = false;

      id.split("").some(idLetter => {
        if (hasSeenTwo && hasSeenThree) return true;
        if (seenLetters.has(idLetter)) return false;
        seenLetters.add(idLetter);
        if (id.split(idLetter).length === 3) hasSeenTwo = true;
        if (id.split(idLetter).length === 4) hasSeenThree = true;
        return false;
      });

      return { hasSeenTwo, hasSeenThree };
    })
    .reduce(
      (accumulator, { hasSeenTwo, hasSeenThree }) => {
        accumulator.seenTwoCount += hasSeenTwo ? 1 : 0;
        accumulator.seenThreeCount += hasSeenThree ? 1 : 0;
        return accumulator;
      },
      { seenTwoCount: 0, seenThreeCount: 0 },
    );

  return duplicateCounts.seenTwoCount * duplicateCounts.seenThreeCount;
}

const part2TestCase = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`.split("\n");

describe("Day 2 Part 2", () => {
  it("produces the correct result for the test case", () => {
    expect(day2Part2(part2TestCase)).toBe("fgij");
  });

  it("produces the correct result for sample input", () => {
    expect(day2Part2(getDay2Input())).toBe("asgwjcmzredihqoutcylvzinx");
  });
});

function day2Part2(idList: string[]): string {
  for (let j = 0; j < idList.length - 1; j += 1) {
    for (let k = 1; k < idList.length; k += 1) {
      const remainingChars = compareLines(idList[j], idList[k]);
      if (remainingChars) return remainingChars;
    }
  }
  return "";

  function compareLines(line0: string, line1: string): string | null {
    const differences: string[] = [];
    for (let i = 0; i < line0.length; i += 1) {
      if (line0.charAt(i) !== line1.charAt(i)) {
        differences.push(line0.charAt(i));
        if (differences.length > 2) return null;
      }
    }
    return differences.length === 1 ? line0.replace(differences[0], "") : null;
  }
}

function getDay2Input() {
  return `asgwdcmbrkerohqoutfylvzpnx
  asgwjcmbrkejihqoutfylvipne
  asgwjcmbrkedihqoutvylizpnz
  azgsjcmbrkedihqouifylvzpnx
  asgwucmbrktddhqoutfylvzpnx
  asgwocmbrkedihqoutfylvzivx
  aqgwjcmbrkevihqvutfylvzpnx
  tsgljcmbrkedihqourfylvzpnx
  asgpjcmbrkedihqoutfnlvzsnx
  astwjcmbrktdihqrutfylvzpnx
  asgwjcmbrpedhhqoutfylvzynx
  xsgwjcmbrkedieqowtfylvzpnx
  asgwjcmbvkedihfoutnylvzpnx
  asgwjcmtrkedihqouafylvzcnx
  asgwjcmbrkedihqoutfylvxpvm
  usgwjcmbrkedihqortfyuvzpnx
  asgwjcmbrwedihqoutfylizpix
  asgrjcvbrkedixqoutfylvzpnx
  asgwjcmbrogdihqoutfelvzpnx
  aggwjcmbrkesihqoutoylvzpnx
  asgtjccbrkedihqoutfrlvzpnx
  asgcucmbrbedihqoutfylvzpnx
  esgwjcmbrkedihqsutfylvzcnx
  asgwjcmbrkedrhqoutfyobzpnx
  mngwjcbbrkedihqoutfylvzpnx
  asgwjcrbrkeoihqyutfylvzpnx
  apgwjcmbrkednhqogtfylvzpnx
  asgwjcwbrkedihqoutfylplpnx
  asgwjcmbrkfdihqoutfxlvzpyx
  aegwjcmbrkedihqoutfylbxpnx
  asgljcmbrkedixqoutaylvzpnx
  aigwjcmbrkedihqouhfylvzpex
  asgwjbmbrkedihqoutfylfzpnp
  asgwjcmzroedihqoutcylvzinx
  asgwjcwbrieuihqoutfylvzpnx
  aagwjcmbrkedjhqdutfylvzpnx
  ahgwjcmbrkedihqsutfylvzpfx
  asgwjcmbrkedihzosttylvzpnx
  aegwjcmbrkedioqnutfylvzpnx
  asgwjcmbykidihqoutfysvzpnx
  asgwkcxbrkeddhqoutfylvzpnx
  ashwjcmbrkeeihqoutfylvzknx
  acgwjcmbrqedihqoqtfylvzpnx
  asgwjcmtrkedihooutfylszpnx
  asgwjcmbrkmdihqfutrylvzpnx
  asgwjcmbrkedihqoutjylvapnn
  asgwjcmbwkedihqoutkylkzpnx
  asgwjrmbrkedihqoutfycnzpnx
  asgwtcmbrkedihqoqtfylozpnx
  asgajcmbrkedihqoutuylvzpny
  asgwjcmbykedihqoutfylfzpwx
  asgwjcsbrkedihpoutfylvvpnx
  hsdwjcmbrvedihqoutfylvzpnx
  asgwjcmbrkedihqoutfdmszpnx
  adgwjcmbrtidihqoutfylvzpnx
  augwjcmbriedihqoutgylvzpnx
  asgwjvmbreedihqoutfllvzpnx
  asgwjcnbfkedihqoltfylvzpnx
  asgwjcmbykddihqoutqylvzpnx
  ajgwjcmbrkedihqoutfylvpvnx
  asgwjcmbrkydihqoutfylszpnl
  xsgwjcmbrkqdihqoutfylvkpnx
  asgwjcmbrkedimqoutfklvzknx
  csgwjbmbrkedihqoftfylvzpnx
  asgwjcmbjkedihjoutfylvzpnn
  asgwjcmprkedihqoulfalvzpnx
  asgwjcmbrvediqqoutfyuvzpnx
  asgwjambrkedhhqoutkylvzpnx
  asgejcmbrkidihqoutfylvzpnk
  hsiwjcmbrkedihqoutfylvzpnq
  asswjczbrkedihqoutfylczpnx
  asgwjnmbrkedyhzoutfylvzpnx
  asgwscmbrkedihqoutfklvlpnx
  asgwlcmbrktdihqoutfylvzpax
  asfwjcmerkedihqoutfylvipnx
  asgwjcmbrkeditqoeafylvzpnx
  asgwgcmbrkesihqoutfylyzpnx
  fsgwjcmbrkedihqouvfyavzpnx
  asgwjcmbrpedwhqoutfylmzpnx
  asgwjcmbrkzdzhqoucfylvzpnx
  asgwjcmnrketmhqoutfylvzpnx
  asgwjcmbrkedihxoutsylvzpnh
  asgwjcobrkedihqoutfrlvzpox
  asgwjcmbrkedihqootfylxzpox
  asgjjcmcrkedihqoutfylmzpnx
  lsgwjcmbrkedihqoutfyqvzunx
  asgwjcmbrwedihqoutoylvzpnu
  aszwjcmbtkedihqoutfylczpnx
  asgwjcmbykedihqoutfylvgpex
  asgijcmbrkedilqoutkylvzpnx
  astwxcmzrkedihqoutfylvzpnx
  akgwjcmbnkedihqfutfylvzpnx
  asgwjcmbrqndivqoutfylvzpnx
  asgwjrmbrleqihqoutfylvzpnx
  asgwjcmbrkevihqoutfxlvzpvx
  asbwjcmbrkedihqoutfelvwpnx
  asewjcbbrkmdihqoutfylvzpnx
  asgwjcmbrkeaihxoutfylpzpnx
  asgwjzmbrkedihqrotfylvzpnx
  asgwjcmbrkedihqoutgdxvzpnx
  asgwjcwbrkmdihqoutfylvzlnx
  asgwjcmbrkegihqoutfylrzpax
  ajgwjcmbrkegihqhutfylvzpnx
  asgwjcmbrzedihqhutfylvkpnx
  asgwjcmwrkedihqouhfylkzpnx
  aygwjcmbrkedihqoutfdlvzpnr
  asgwjcmbrkednhqoutiylvypnx
  aqgwjcmbrkezihqoutfylvzonx
  bsgwjcmbrkedihqouhfylvzsnx
  asgwjcmcrkedihqokyfylvzpnx
  asgsjcmbrkewiyqoutfylvzpnx
  asgwpcmbrkejihqoutfylzzpnx
  asgwjumbrkedbeqoutfylvzpnx
  asgwjcmbrkedihpoutqylqzpnx
  awgwjcmbrredihqoutfylvzpna
  asgwjsmbraedihqoutfylvzpvx
  asgwncmbrkedihqoutfyljzrnx
  asgwncmbrkedihqohtfylvzonx
  asgwjcmbrkedihqlutfylvypux
  asgwjcmbbkedihooutfylkzpnx
  asghjcmsryedihqoutfylvzpnx
  asgwjcmbrkevihqoulfzlvzpnx
  asggjcmbrkedizqoutfylvzknx
  asbwjcmbriedihqoutfylvmpnx
  asgwjcmbrkedqbqoutfylvzenx
  asgwjcmprkedihqoutfylvzknp
  asgwjcmbrkerihqoutfwlvzpno
  asgwjcmvrkesihqoutrylvzpnx
  asgzjcmbrkedihqoutfnlvbpnx
  asfwjcmbrkhdihqoutfylpzpnx
  asgwjcmbskedihqdutfyyvzpnx
  asgwjcmzrkedihqoutcylvzinx
  asgwjcmbrkedibqoutfylvjonx
  asgwjcmbrbedihqoutfylmzbnx
  asgwjcmbrkedhhqoutmylczpnx
  asgwjcmbrkbgihqoutzylvzpnx
  asgwjcfbrkedihqoupfyxvzpnx
  asiwjcmbzkedihqoutfyluzpnx
  asvwjcmbrkedihqoitfylvzpns
  asgwjcmxikedihqoutfyevzpnx
  asgwjcmbrkedioqoutfylvzwox
  asgwjcmbrkedivqoutjyuvzpnx
  asgwjcmbkkydihqrutfylvzpnx
  asgwjcmbrkxdiuqoutfylvopnx
  asgwjcmbrkedihqouthylvzpra
  asgwjcmbrzedimloutfylvzpnx
  asgwjcmbrkedmhqoulfytvzpnx
  asgwjcmbrkzdihqrutfysvzpnx
  ssgwjcmxrkedihqoutftlvzpnx
  asgwjcmbrkedihqoutfajvzynx
  asgwjcmbrkqdihqxuufylvzpnx
  asmwjcabrkedihqouxfylvzpnx
  asgwjcmbrkeeihqoatfycvzpnx
  asgwjcjbrgedjhqoutfylvzpnx
  asgljcmtrkedihqoutoylvzpnx
  asgwjcmbrkedigqouzfylvzpvx
  ajgvjcmbkkedihqoutfylvzpnx
  asgwjcmbrkedihqtugfygvzpnx
  asgbjcmbrkedihboftfylvzpnx
  asgwjwmbrkedihqontfylhzpnx
  asgwjfmhrkedihqoutfylvqpnx
  asgwjxmbrkedihqoutzylvzpnj
  asgwjcrlrkedihqoutfylvzpsx
  aygwjcmbrkedihqoutsylvzdnx
  zsgwjcmbrkedihjogtfylvzpnx
  asgwjxmbrkegihqoutfylvopnx
  asgwjcmbrkedihqhutfylvzcnr
  asgwicmbrkewihvoutfylvzpnx
  asqwjcmbvkedihqoutfylvzknx
  asgwjcmbrkedihqoktfyevzpnu
  asgwjcmbrkudihqoutfylqzznx
  asgwjdmbrkedihqoutfylvvdnx
  asgwjcmbrkwmihqautfylvzpnx
  asgwjcmbrxedihqoctfyldzpnx
  asgwjdmbrkedjhqoutfyfvzpnx
  asgwjcmtrzedihqoutfylvzpnm
  bpgwjcmbrmedihqoutfylvzpnx
  asgwjctbrkedihqoqtfynvzpnx
  askhjcmbrkedihqoutfylvzrnx
  asgkjcmblkehihqoutfylvzpnx
  asgwjjmbrkedvhqoutfhlvzpnx
  asgwjcmbrkedihqoupzylvzknx
  asgwjcmbukedchqoutfylizpnx
  askwjcmdrkedihqoutwylvzpnx
  asgwjcmbtkcdihloutfylvzpnx
  asgwjcmbrkedwgqoutvylvzpnx
  asmwjcmbrkedihqoutfylozpnc
  asgwjcmbriedibqouofylvzpnx
  asgnjcmcrkedihqoupfylvzpnx
  asgzjcmbrksdihqoutiylvzpnx
  asgwjcrbkkedihqouafylvzpnx
  asgwjcmbkkvdihqqutfylvzpnx
  astwjcqbrkedihqoutfylvzpvx
  asgwjcmhrkehihqoutfylvzvnx
  asgwjcmbraeduhqoutmylvzpnx
  asgwjcmbrkedihquutnylvzptx
  asgwjcmbrkedilqoftfylvzpnz
  akgwjmmbrkedihqoutfylxzpnx
  asgwjcmbrkhxikqoutfylvzpnx
  asgcjcmetkedihqoutfylvzpnx
  fsgwjcmsrkedihooutfylvzpnx
  gsgwjcmbrkedihdoutfylvzdnx
  asgwtccbrkedihqoutfylvwpnx
  asuwjcmbrkedihqcutfylvzpox
  asgwacmbrkodihqlutfylvzpnx
  asgwjcmbrkediuqoutfylqhpnx
  asgwjcmbrkwdrhqoutfylvzpno
  angwjcsblkedihqoutfylvzpnx
  aigwjcmbyoedihqoutfylvzpnx
  adgwjcmbrkedihqtutfylyzpnx
  asgwjzmbrkeeihqputfylvzpnx
  asgwjcmbrkwdihqoutfylvzpwc
  asgpjcmbrkgdihqbutfylvzpnx
  osgwjmmbrkedijqoutfylvzpnx
  asgjjcmbrkkdihqoutfylvzynx
  asgwjcnerwedihqoutfylvzpnx
  azgwhcmbrkedicqoutfylvzpnx
  asnwjcmbrsedihqoutfylvzpnm
  hsgwjcmgrkedihqoutfilvzpnx
  asgwscmbrkjdihqoutfylvzpnm
  asgbjbmbrkedhhqoutfylvzpnx
  aswwjcmtrkedihqjutfylvzpnx
  asgwicmbrbedihqoutfylvzpnm
  asgwjcubrkedihqoutfylvbnnx
  asvwjcmbrkehihqoutfylhzpnx
  gsgwjcmbrkedihqoutsklvzpnx
  asgwjcubikedihqoitfylvzpnx
  asgwjpmbskedilqoutfylvzpnx
  aigwjcmbrxedihqoutyylvzpnx
  asgwjcpbrkedihxoutfynvzpnx
  asgwjcmbrkegihqoutfklvzcnx
  asgwjvubrkedjhqoutfylvzpnx
  asgwjcabrkedihqoutfyivzplx
  asgwjcxbrkedihqgutfylvepnx
  asgwlcmbrkedihqoutqylvwpnx
  asgwjhmbrkydihqhutfylvzpnx
  asgwjcmbrkedihqoutfylwzone
  asgwycmbrkadihqoutuylvzpnx
  asgwjcybrkedihqoftfylvzpne
  asgwjcmnrkedihrodtfylvzpnx
  asgwicmwrkedihqoutfyovzpnx
  aqgwjlmbrkedilqoutfylvzpnx
  asgwjcmzskwdihqoutfylvzpnx
  asgwjcmdrkebihqoutfylvjpnx
  asgwjcmbrkpdihqoutfylxzphx
  asgwjcmbrkedixqoutlylfzpnx
  asgwjcmbrkadihqoutfylvlpdx
  asgejcmqrkedyhqoutfylvzpnx
  asgwjcmvroedihpoutfylvzpnx
  asgwjcmxrkedihqoutfyivzpmx`
    .split("\n")
    .map(s => s.trim());
}

export {};
