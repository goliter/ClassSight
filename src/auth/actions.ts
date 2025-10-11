/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { studentOperations, teacherOperations, adminOperations } from "../db/db";
import { signIn } from "./auth";

export async function login(formData: FormData) {
  const account = formData.get("account");
  const password = formData.get("password");
  let role = formData.get("role");
  role = role === "0" ? "student" : role === "1" ? "teacher" : "admin";
  
  if (!account || !password || !role) {
    throw new Error("请填写完整的登录信息");
  }
  try {
    console.log(signIn);
    await signIn("credentials", {
      account,
      password,
      role,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("登录失败: " + error);
    } else {
      throw new Error("登录失败: " + String(error));
    }
  }
  
  return {
    success: true,
    message: "登录成功",
  };
}

export async function register(formData: FormData) {
  const account = formData.get("account") as string;
  const password = formData.get("password") as string;
  let role = formData.get("role") as string;
  
  role = role === "0" ? "student" : role === "1" ? "teacher" : "admin";
  if (!account || !password || !role) {
    throw new Error("请填写完整的注册信息");
  }
  function isExist(account: string, role: string) {
    if (role === "0") {
      return studentOperations.findById(account);
    } else if (role === "1") {
      return teacherOperations.findById(account);
    } else {
      return adminOperations.findById(account);
    }
  }

  if (await isExist(account, role)) {
    throw new Error("账号已存在");
  }
  try {
    if (role === "0") {
      await studentOperations.create({ studentId: account, password });
    } else if (role === "1") {
      await teacherOperations.create({ teacherId: account, password });
    } else {
      await adminOperations.create({ adminId: account, password });
    }
  } catch (error) {
    throw new Error("注册失败");
  }
  
  return {
    success: true,
    message: "注册成功",
  };
}
