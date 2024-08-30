import { PublicationReportReason, useReportPublication } from "@lens-protocol/react-web";
import { useState } from "react";
import { RiAlertLine } from "react-icons/ri";

export default function Report({ publication }) {
    const { execute: report, loading,error } = useReportPublication();

    // 用于存储用户选择的举报原因和评论
    const [selectedReason, setSelectedReason] = useState(PublicationReportReason.FAKE_ENGAGEMENT);
    const [comments, setComments] = useState('');

    const handleSubmit = async () => {
        // 直接执行举报操作，不检查登录状态
        const result = await report({
            publicationId: publication.id,
            reason: selectedReason,  // 使用用户选择的举报原因
            additionalComments: comments,  // 使用用户输入的评论
        });

        if (result.isSuccess()) {
            alert('已举报该发布！');
        } else {
            alert('举报失败，请重试。');
        }
    };
    function showModal() {
        const modalElement = document.getElementById('my_modal_3') as HTMLDialogElement;
        if (modalElement) {
          modalElement.showModal();
        } else {
          console.error('Modal element not found.');
        }
      }
    return (
        <button onClick={showModal} className="flex flex-row ">


            <RiAlertLine className="size-6 text-red-600" /> <span className="text-red-600">举报</span>
            <div>

                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">


                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">选择举报类型</h3>


                        {/* 举报原因选择框 */}
                        <select
                            value={selectedReason}
                            onChange={(e) => setSelectedReason(e.target.value as PublicationReportReason)}
                            className="select select-primary w-full max-w-xs my-3"
                        >
                            {reportOptions.map((option) => (
                                <option key={option.key} value={option.key}>
                                    {option.title}
                                </option>
                            ))}
                        </select>

                        {/* 评论输入框 */}
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="人类可读的评论（如果有）。"
                            className="textarea textarea-bordered w-full mb-3"
                        />
                        <form method="dialog">
                            <button className="btn w-full" onClick={handleSubmit} disabled={loading}>
                                举报
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>



        </button>
    );
}
// 举报类型的中文选项
const reportOptions = [
    { title: "动物虐待", key: PublicationReportReason.ANIMAL_ABUSE },
    { title: "直接威胁", key: PublicationReportReason.DIRECT_THREAT },
    { title: "虚假互动", key: PublicationReportReason.FAKE_ENGAGEMENT },
    { title: "骚扰", key: PublicationReportReason.HARASSMENT },
    { title: "仇恨言论", key: PublicationReportReason.HATE_SPEECH },
    { title: "冒充", key: PublicationReportReason.IMPERSONATION },
    { title: "算法操纵", key: PublicationReportReason.MANIPULATION_ALGO },
    { title: "误导性内容", key: PublicationReportReason.MISLEADING },
    { title: "滥用标签", key: PublicationReportReason.MISUSE_HASHTAGS },
    { title: "裸露", key: PublicationReportReason.NUDITY },
    { title: "冒犯", key: PublicationReportReason.OFFENSIVE },
    { title: "重复", key: PublicationReportReason.REPETITIVE },
    { title: "诈骗", key: PublicationReportReason.SCAM },
    { title: "自残", key: PublicationReportReason.SELF_HARM },
    { title: "其他", key: PublicationReportReason.SOMETHING_ELSE },
    { title: "未经授权的销售", key: PublicationReportReason.UNAUTHORIZED_SALE },
    { title: "无关内容", key: PublicationReportReason.UNRELATED },
    { title: "暴力", key: PublicationReportReason.VIOLENCE },
];