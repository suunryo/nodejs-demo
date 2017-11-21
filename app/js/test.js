var json = {
    name: 'zs'
}

// $.ajax({
//     url: '/test',
//     type: 'post',
//     data: json,
//     success: function(res) {
//         console.log(res)
//     }
// })
var table = document.getElementById('table')
var tbody = document.getElementById('tbody')
var refresh = document.getElementById('refresh')
var add = document.getElementById('add')



// 查询
$('#refresh').on('click', function() {
    $.ajax({
        url: '/queryAll',
        type: 'post',
        data: '',
        success: function(res) {
            var data = res.result;
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var tr = `<tr>
                            <td>` + data[i].id + `</td>
                            <td>` + data[i].name + `</td>
                            <td>` + data[i].age + `</td>
                            <td>` + data[i].gender + `</td>
                            <th>
                                <button class="del" index="` + data[i].id + `">delete</button>
                                <button class="update" index="` + data[i].id + `">update</button>
                            </th>
                        </tr>`
                html = html + tr
            }
            $('#tbody').html(html)
        }
    })
})
$('#refresh').click()

// 新增
$('#add').on('click', function() {
    var name = $('#name').val()
    var age = $('#age').val()
    var gender = $('#gender').val()

    $.ajax({
        url: '/add',
        type: 'post',
        data: {
            name: name,
            age: age,
            gender: gender
        },
        success: function(res) {
            if (res.code == 200) {
                $('#name').val('')
                $('#age').val('')
                $('#gender').val('')

                $('#refresh').click()
            }
        }
    })
})

// 删除
$('#tbody').on('click', '.del', function() {
    var id = $(this).attr('index')
    console.log(id)
    $.ajax({
        url: '/delById',
        type: 'post',
        data: { id: id },
        success: function(res) {
            console.log(res)
            $('#refresh').click()
        }
    })
})

// 修改
$('#tbody').on('click', '.update', function() {
    var id = $(this).attr('index')
    console.log(id)
    $.ajax({
        url: '/updateAge',
        type: 'post',
        data: { id: id },
        success: function(res) {
            console.log(res)
            $('#refresh').click()
        }
    })
})