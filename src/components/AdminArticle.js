import React, { Component } from 'react';
import axios from 'axios'

class AdminArticle extends Component {

    constructor(props) {
        super(props);

        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeTieuDe = this.onChangeTieuDe.bind(this);
        this.onChangeNoiDung = this.onChangeNoiDung.bind(this);



        this.state = {
            startDay: "",
            endDay: "",
            posts: new Array(),
            //modal
            modalTitle: "",
            modalContent: "",
            //
            tieuDe: "",
            noiDung: "",
        }
    }


    onChangeStart(e) {
        this.setState({
            startDay: e.target.value,
        })
    }
    onChangeEnd(e) {
        this.setState({
            endDay: e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.startDay == "" || this.state.endDay == "") {
            return alert("Vui lòng nhập ngày")
        }

        const dataForm = {
            start: new Date(this.state.startDay).toISOString(),
            end: new Date(this.state.endDay).toISOString(),
        }
        console.log(dataForm);
        axios.post('http://localhost:5000/article/findByDate', dataForm)
            .then(
                res => {
                    console.log(res.data)
                    this.setState({
                        posts: res.data
                    })
                }
            )
    }
    //delete article
    deletePost(inputId){
        axios.delete('http://localhost:5000/article/delete/' + inputId)
        .then(
            res => {
                alert("Xóa thành công!")
                //chạy lại page
                const dataForm = {
                    start: new Date(this.state.startDay).toISOString(),
                    end: new Date(this.state.endDay).toISOString(),
                }
                console.log(dataForm);
                axios.post('http://localhost:5000/article/findByDate', dataForm)
                    .then(
                        res => {
                            console.log(res.data)
                            this.setState({
                                posts: res.data
                            })
                        }
                )
    })
    }


    //create article
    onChangeTieuDe(e) {
        this.setState({
            tieuDe: e.target.value,
        })
    }
    onChangeNoiDung(e) {
        this.setState({
            noiDung: e.target.value,
        })
    }
    createPost() {
        if (this.state.tieuDe.length == 0) {
            return alert('Vui lòng nhập tiêu đề');
        }
        if (this.state.noiDung.length == 0) {
            return alert('Vui lòng nhập nội dung');
        }

        var dataForm = {
            ten_bai_viet: this.state.tieuDe,
            noi_dung: this.state.noiDung,
        }

        console.log(dataForm);
        axios.post('http://localhost:5000/article/add', dataForm)
            .then(res => {
                alert("Tạo bài viết thành công!")
            })
    }


    showPostDisplay() {
        if (this.state.posts) {
            return (
                <div>
                    <h5>Kết Quả Tìm Kiếm</h5>
                    {this.state.posts.map((obj, idx) => {
                        return (<div key={idx}>
                            <div className="card bg-light mb-3" style={{ maxWidth: '100%' }}>
                                <div className="card-header">Bài viết:  {obj.ten_bai_viet}</div>
                                <div className="card-body">
                                    <h5 className="card-title">Độ dài: {obj.noi_dung.length}</h5>
                                    <p className="card-text">Ngày Đăng: {obj.createdAt}</p>
                                    <p>
                                        <button className="btn btn-danger  ml-2" onClick={()=>{
                                            this.setState({
                                                modalTitle:obj.ten_bai_viet,
                                                modalContent:obj.noi_dung,
                                            })
                                            }} data-toggle="modal" data-target="#exampleModal">Xem</button>
                                        <button className="btn btn-danger  ml-2" onClick={() => this.deletePost(obj._id)}>Xóa bài viết</button>
                                    </p>
                                </div>
                                
                    {/* Modal */ }
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">{this.state.modalTitle}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                          {this.state.modalContent}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn" data-dismiss="modal">Đóng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            </div> {/* key */}
                        </div>


                        );

                    })}



                </div>

            )
        }
    }

    render() {
        return (
            <div>
                <h1>Bài Viết</h1>
                <form className="example" onSubmit={this.onSubmit}>
                    <h5>Tìm bài viết</h5>
                    <table className="admin-table">
                        <tr className="table-title">
                            <th>Thời gian bắt đầu</th>
                            <th>Đến</th>
                        </tr>
                        <tr>
                            <td><input type="date" type="datetime-local" onChange={this.onChangeStart} /></td>
                            <td><input type="date" type="datetime-local" onChange={this.onChangeEnd} /></td>
                        </tr>
                    </table>
                    <button type="submit"><i className="fa fa-search" /></button>
                    <br /><br />
                </form>

                {this.showPostDisplay()}
                <h5>Tạo bài viết</h5>
                <div className="row">
                    <label className="col-2">Tiêu đề bài viết</label>
                    <div className="col-10">
                        <input className="form-control" type="text" onChange={this.onChangeTieuDe} />
                    </div>
                </div>

                <input type="hidden" name="myDoc" />
                <label>Nội dung bài viết</label>
                <div id="toolBar2">
                    <img className="intLink" title="Clean" onclick="if(validateMode()&&confirm('Are you sure?')){oDoc.innerHTML=sDefTxt};" src="data:image/gif;base64,R0lGODlhFgAWAIQbAD04KTRLYzFRjlldZl9vj1dusY14WYODhpWIbbSVFY6O7IOXw5qbms+wUbCztca0ccS4kdDQjdTLtMrL1O3YitHa7OPcsd/f4PfvrvDv8Pv5xv///////////////////yH5BAEKAB8ALAAAAAAWABYAAAV84CeOZGmeaKqubMteyzK547QoBcFWTm/jgsHq4rhMLoxFIehQQSAWR+Z4IAyaJ0kEgtFoLIzLwRE4oCQWrxoTOTAIhMCZ0tVgMBQKZHAYyFEWEV14eQ8IflhnEHmFDQkAiSkQCI2PDC4QBg+OAJc0ewadNCOgo6anqKkoIQA7" />
                    <img className="intLink" title="Bold" onclick="formatDoc('bold');" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAInhI+pa+H9mJy0LhdgtrxzDG5WGFVk6aXqyk6Y9kXvKKNuLbb6zgMFADs=" />
                    <img className="intLink" title="Italic" onclick="formatDoc('italic');" src="data:image/gif;base64,R0lGODlhFgAWAKEDAAAAAF9vj5WIbf///yH5BAEAAAMALAAAAAAWABYAAAIjnI+py+0Po5x0gXvruEKHrF2BB1YiCWgbMFIYpsbyTNd2UwAAOw==" />
                    <img className="intLink" title="Underline" onclick="formatDoc('underline');" src="data:image/gif;base64,R0lGODlhFgAWAKECAAAAAF9vj////////yH5BAEAAAIALAAAAAAWABYAAAIrlI+py+0Po5zUgAsEzvEeL4Ea15EiJJ5PSqJmuwKBEKgxVuXWtun+DwxCCgA7" />
                    <img className="intLink" title="Left align" onclick="formatDoc('justifyleft');" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JMGELkGYxo+qzl4nKyXAAAOw==" />
                    <img className="intLink" title="Center align" onclick="formatDoc('justifycenter');" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIfhI+py+0Po5y02ouz3jL4D4JOGI7kaZ5Bqn4sycVbAQA7" />
                    <img className="intLink" title="Right align" onclick="formatDoc('justifyright');" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JQGDLkGYxouqzl43JyVgAAOw==" />
                    <img className="intLink" title="Numbered list" onclick="formatDoc('insertorderedlist');" src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAADljwliE35GjuaezxtHa7P///////yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKSespwjoRFvggCBUBoTFBeq6QIAysQnRHaEOzyaZ07Lu9lUBnC0UGQU1K52s6n5oEADs=" />
                    <img className="intLink" title="Cut" onclick="formatDoc('cut');" src="data:image/gif;base64,R0lGODlhFgAWAIQSAB1ChBFNsRJTySJYwjljwkxwl19vj1dusYODhl6MnHmOrpqbmpGjuaezxrCztcDCxL/I18rL1P///////////////////////////////////////////////////////yH5BAEAAB8ALAAAAAAWABYAAAVu4CeOZGmeaKqubDs6TNnEbGNApNG0kbGMi5trwcA9GArXh+FAfBAw5UexUDAQESkRsfhJPwaH4YsEGAAJGisRGAQY7UCC9ZAXBB+74LGCRxIEHwAHdWooDgGJcwpxDisQBQRjIgkDCVlfmZqbmiEAOw==" />
                    <img className="intLink" title="Copy" onclick="formatDoc('copy');" src="data:image/gif;base64,R0lGODlhFgAWAIQcAB1ChBFNsTRLYyJYwjljwl9vj1iE31iGzF6MnHWX9HOdz5GjuYCl2YKl8ZOt4qezxqK63aK/9KPD+7DI3b/I17LM/MrL1MLY9NHa7OPs++bx/Pv8/f///////////////yH5BAEAAB8ALAAAAAAWABYAAAWG4CeOZGmeaKqubOum1SQ/kPVOW749BeVSus2CgrCxHptLBbOQxCSNCCaF1GUqwQbBd0JGJAyGJJiobE+LnCaDcXAaEoxhQACgNw0FQx9kP+wmaRgYFBQNeAoGihCAJQsCkJAKOhgXEw8BLQYciooHf5o7EA+kC40qBKkAAAGrpy+wsbKzIiEAOw==" />
                    <img className="intLink" title="Paste" onclick="formatDoc('paste');" src="data:image/gif;base64,R0lGODlhFgAWAIQUAD04KTRLY2tXQF9vj414WZWIbXmOrpqbmpGjudClFaezxsa0cb/I1+3YitHa7PrkIPHvbuPs+/fvrvv8/f///////////////////////////////////////////////yH5BAEAAB8ALAAAAAAWABYAAAWN4CeOZGmeaKqubGsusPvBSyFJjVDs6nJLB0khR4AkBCmfsCGBQAoCwjF5gwquVykSFbwZE+AwIBV0GhFog2EwIDchjwRiQo9E2Fx4XD5R+B0DDAEnBXBhBhN2DgwDAQFjJYVhCQYRfgoIDGiQJAWTCQMRiwwMfgicnVcAAAMOaK+bLAOrtLUyt7i5uiUhADs=" />
                </div>
                <textarea className="form-control" rows="10" cols="50" onChange={this.onChangeNoiDung} />
                <p id="editMode"><input type="checkbox" onchange="" /> <label>Show HTML</label></p>
                <p><input className="btn" type="button" defaultValue="Tạo Bài Viết" onClick={() => { this.createPost() }} /></p>



            </div>
        )
    }

}

export default AdminArticle;