
// Nhóm các record lại theo ngày đăng tải rồi tính trung bình theo keyCount
export function groupObjectByField(list, key, countKey) {
    // Nhóm các record lại theo key, trả về một object key - value
    const groups = list.reduce((groups, item) => {
        const group = (groups[item[key]] || []);
        group.push(item);
        groups[item[key]] = group;
        return groups;
    }, {});
    console.log('groups =', groups);

    // {
    //     '10/04/2022': [{...}, {...}],
    //     '12/04/2022': [{...}]
    // }

    // lặp qua các key của một object, tính tổng của value theo countKey
    for (const key in groups) {
        const result = groups[key].reduce((total, currentValue) => total + currentValue[countKey], 0) / groups[key].length;
        groups[key] = Math.ceil(result);
    }
    console.log('groups =', groups);
      
    return groups;
}