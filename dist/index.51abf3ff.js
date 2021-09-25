let $siteList = $('.siteList');
let $lastLi = $siteList.find('li.last');
let x = JSON.parse(localStorage.getItem('x'));
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};
//x存在则用x  x不存在则用初始值
const hashMap = x || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }
];
const simplifyUrl = (url)=>url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
;
const render = ()=>{
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`\n        <li>\n            <div class="site">\n                <div class="logo">${node.logo}</div>\n                <div class="link">${simplifyUrl(node.url)}</div>\n                <div class="close">\n                <svg class="icon">\n                <use xlink:href="#icon-close"></use>\n              </svg>\n                </div>\n            </div>\n    </li>\n        `).insertBefore($lastLi);
        $li.on('click', function() {
            window.open(node.url, '_self');
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('请输入要访问的网址。');
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    render();
});
$(document).on('keypress', (e)=>{
    const { key  } = e //key = e.key
    ;
    hashMap.forEach((item, index)=>{
        item.logo.toLowerCase() === key ? window.open(item.url, '_self') : console.log('');
    });
});

//# sourceMappingURL=index.51abf3ff.js.map
