"use client";

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* 背景图片 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image/nefu.png')" }}
      ></div>

      {/* 背景遮罩层，确保文字可读性 */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 背景装饰元素 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="min-h-screen flex flex-col justify-between relative z-10">
        {/* 顶部区域 - 标题 */}
        <div className="flex-grow flex items-center justify-center pt-16 pb-8">
          <div className="text-center px-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              ClassSight
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 max-w-3xl mx-auto">
              课堂行为洞察系统
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-1 bg-blue-300/50 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 中间区域 - 项目介绍 */}
        <div className="flex-grow flex items-center justify-center py-8 px-4">
          <div className="max-w-4xl w-full text-center">
            <div className="inline-block uppercase tracking-wider text-sm text-blue-200 font-semibold mb-4 bg-blue-900/30 px-4 py-2 rounded-full">
              项目介绍
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              智能课堂行为分析系统
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <p className="text-xl text-blue-100 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                ClassSight是一个创新的课堂行为洞察系统，通过与"小黑盒"设备结合，
                利用摄像设备和大模型技术，实现对学生课堂行为的智能分析。
              </p>
              <p className="text-xl text-blue-100 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                系统能够统计和展示学生的考勤数据、专注度、举手次数等关键指标，
                为教师提供实时的课堂反馈，帮助提升教学质量。
              </p>
            </div>
          </div>
        </div>

        {/* 底部区域 - 按钮和系统特色 */}
        <div className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* 按钮区域 */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Link
                href="/auth/register"
                className="px-10 py-5 bg-white text-indigo-700 font-bold text-xl rounded-2xl hover:bg-blue-50 transition-all duration-300 text-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 w-full sm:w-auto"
              >
                注册账户
              </Link>
              <Link
                href="/auth/login"
                className="px-10 py-5 bg-indigo-900/50 text-white font-bold text-xl rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all duration-300 text-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 w-full sm:w-auto backdrop-blur-sm"
              >
                登录系统
              </Link>
            </div>

            {/* 系统特色 */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-10">系统特色</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="h-12 w-12 text-blue-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    智能行为识别
                  </h4>
                  <p className="text-blue-100">
                    通过AI技术自动识别和分析学生课堂行为
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="h-12 w-12 text-blue-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    实时数据展示
                  </h4>
                  <p className="text-blue-100">
                    实时展示课堂数据，帮助教师及时调整教学策略
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="h-12 w-12 text-blue-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    多维度分析
                  </h4>
                  <p className="text-blue-100">
                    从多个维度分析学生表现，提供全面的评估报告
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className="py-6 text-center text-white/80 text-lg">
          <p>
            © {new Date().getFullYear()} ClassSight - 课堂行为洞察系统.
            与"小黑盒"设备完美结合.
          </p>
        </div>
      </div>
    </div>
  );
}
