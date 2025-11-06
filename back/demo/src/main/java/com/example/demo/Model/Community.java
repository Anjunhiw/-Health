package com.example.demo.Model;

public class Community {
    private int id;            // 게시글 번호
    private String title;      // 제목
    private String content;    // 내용
    private String category;  // 카테고리 필드 추가
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
	@Override
	public String toString() {
		return "Community [id=" + id + ", title=" + title + ", content=" + content + ", category=" + category + "]";
	}


}
