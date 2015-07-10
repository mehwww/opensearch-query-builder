# opensearch-query-builder

阿里云开放搜索查询url构建工具

详细使用方法请参考阿里云 [OpenSearch API 参考手册](http://docs.aliyun.com/#/pub/opensearch/api-reference/terminology)

## Install
```bash
npm i opensearch-query-builder 
```

## How to use
```js
var qb = require('opensearch-query-builder')({
  host: 'OpenSearch API Host'
  accessKeyId: 'Aliyun Access Key ID',
  accessKeySecret: 'Aliyun Access Key Secret'
});

var url = qb('posts')
  .formulaName('default')
  .query('(title:"${title1}" OR title:"${title2}") AND type:"${type}"', {
    title1: '北京大学',
    title2: '清华大学',
    type: 1
  })
  .config('format:fulljson,start:${1},hit:${2}', 0, 20)
  .sort('+RANK')
  .compile();
  
request(url, function (error, response, body) {
  ...
})

```

## Reference

### `qb(string|array)`
生成一个 query builder 并指定其要搜索的应用名，若为数组的话表示将进行多应用同时查询

### `.query(templates,[holder...])`
采用字符串模板的办法指定 query 参数中的 query 子句，若第二个参数是个对象，那么模板中的占位符`${}`将替换成对象中相应的值，若第二个参数是字符串，那么模板将把参数嵌入到相对应的位置。

之后使用字符串模板的的方法与此相同

### `.config(templates,[holder...])`
指定 query 参数中的 config 子句

### `.filter(templates,[holder...])`
指定 query 参数中的 filter 子句

### `.sort(templates,[holder...])`
指定 query 参数中的 sort 子句

### `.aggregate(templates,[holder...])`
指定 query 参数中的 aggregate 子句

### `.distinct(templates,[holder...])`
指定 query 参数中的 distinct 子句

### `.kvpair(templates,[holder...])`
指定 query 参数中的 kvpair 子句

### `.indexName(string|array)`
指定 index_name 参数

### `.fetchFields(string|array)`
指定 fetch_fields 参数

### `.qp(string|array)`
指定 qp 参数

### `.disable(string)`
指定 disable 参数

### `.firstFormulaName(string)`
指定 first\_formula\_name 参数

### `.formulaName(string)`
指定 formula_name 参数

### `.summary(templates,[holder...])`
指定 summary 参数




