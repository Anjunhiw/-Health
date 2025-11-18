package com.example.demo.Model;

public class Community {
    private int id;            // 게시글 번호
    private String title;      // 제목
    private String content;    // 내용
    private String category;   // 카테고리 필드 추가
    private String writer;      // 작성
    private String created_at;   // 작성일
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getwriter() {
		return writer;
	}
	public void setwriter(String writer) {
		this.writer = writer;
	}
	public String getcreated_at() {
		return created_at;
	}
	public void setcreated_at(String created_at) {
		this.created_at = created_at;
	}
	@Override
	public String toString() {
		return "Community [id=" + id + ", title=" + title + ", content=" + content + ", category=" + category
				+ ", writer=" + writer + ", created_at=" + created_at + "]";
	}


}
