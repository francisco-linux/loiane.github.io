---
layout: post
title: 'Java Example: List all Files from a Directory (or Subdirectory)'
published: true
author: Loiane
comments: false
date: 2012-06-15 05:06:46
tags:
    - File
    - Java
    - Java IO
categories:
    - java
image: /assets/images/assets/file.jpeg
category: java   
---

This is a basic algorithm, but it can be very useful in some situations and very handy for those that are learning Java.

The class bellow contains 4 methods:

  1. the first one will list all the files and folder names under a directory
  2. the second one will list all the file names under a directory
  3. the third one will list all the folder names under a directory
  4. the fourth one will list all the files from the directory and its sub-directories (be carefull with this one!)

```java
package com.loiane.util;

import java.io.File;

/**
 * Contains some methods to list files and folders from a directory
 */
public class ListFilesUtil {

	/**
	 * List all the files and folders from a directory
	 * @param directoryName to be listed
	 */
	public void listFilesAndFolders(String directoryName){

		File directory = new File(directoryName);

		//get all the files from a directory
		File[] fList = directory.listFiles();

		for (File file : fList){
			System.out.println(file.getName());
		}
	}

	/**
	 * List all the files under a directory
	 * @param directoryName to be listed
	 */
	public void listFiles(String directoryName){

		File directory = new File(directoryName);

		//get all the files from a directory
		File[] fList = directory.listFiles();

		for (File file : fList){
			if (file.isFile()){
				System.out.println(file.getName());
			}
		}
	}

	/**
	 * List all the folders under a directory
	 * @param directoryName to be listed
	 */
	public void listFolders(String directoryName){

		File directory = new File(directoryName);

		//get all the files from a directory
		File[] fList = directory.listFiles();

		for (File file : fList){
			if (file.isDirectory()){
				System.out.println(file.getName());
			}
		}
	}

	/**
	 * List all files from a directory and its subdirectories
	 * @param directoryName to be listed
	 */
	public void listFilesAndFilesSubDirectories(String directoryName){

		File directory = new File(directoryName);

		//get all the files from a directory
		File[] fList = directory.listFiles();

		for (File file : fList){
			if (file.isFile()){
				System.out.println(file.getAbsolutePath());
			} else if (file.isDirectory()){
				listFilesAndFilesSubDirectories(file.getAbsolutePath());
			}
		}
	}

	public static void main (String[] args){

		ListFilesUtil listFilesUtil = new ListFilesUtil();
		final String directoryLinuxMac ="/Users/loiane/test";

		//Windows directory example
		final String directoryWindows ="C://test";

		listFilesUtil.listFiles(directoryLinuxMac);
	}
}
```

Happy Coding! 