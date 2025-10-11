"use client";

import { useState } from "react";
import { register } from "../../../auth/actions";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    account: "",
    password: "",
    role: "0", // 默认学生角色
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // 清除错误信息
    setSuccess(""); // 清除成功信息
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await register(
        new FormData(e.currentTarget as HTMLFormElement)
      );
      if (result.success) {
        setSuccess("注册成功，请登录");
        // 重置表单
        setFormData({ account: "", password: "", role: "0" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "注册失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">用户注册</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="account"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              账号
            </label>
            <input
              type="text"
              id="account"
              name="account"
              value={formData.account}
              onChange={handleChange}
              placeholder="请输入账号"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              角色
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="0"
                  checked={formData.role === "0"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2">学生</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="1"
                  checked={formData.role === "1"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2">老师</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="2"
                  checked={formData.role === "2"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2">管理员</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "注册中..." : "注册"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            已有账号？{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              立即登录
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
