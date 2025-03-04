import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GroupAnagrams {

    public static Map<String, List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) {
            return Map.of(); // Return an empty map instead of an empty list
        }

        return Arrays.stream(strs)
                .collect(Collectors.groupingBy(s -> {
                    char[] ca = s.toCharArray();
                    Arrays.sort(ca);
                    return String.valueOf(ca);
                }));
    }

    public static void main(String[] args) {
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        Map<String, List<String>> mp = groupAnagrams(strs);

        mp.forEach((key, value) -> {
            String joinedValues = value.stream().collect(Collectors.joining(", "));
            System.out.println(key + " : " + joinedValues);
        });
    }
}
