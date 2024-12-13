import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import { getNoticeInfo, getNoticeFile } from '../../../crud/notice.crud'
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import ExcelIcon from '../../static/images/file/small_icon_excel.jpg'
import PdfIcon from '../../static/images/file/small_icon_pdf.jpg'
import PptIcon from '../../static/images/file/small_icon_ppt.jpg'
import WordIcon from '../../static/images/file/small_icon_word.jpg'
import ImageIcon from '../../static/images/file/small_icon_jpg.jpg'

export default function NoticeView(props){    

	const [ show , setShow ] = useState(props.show)
	const [ noticeId  , setNoticeId ]  = useState(props.noticeId)
	const [ noticeInfo , setNoticeInfo ] = useState({})
	const [ fileList , setFileList ]= useState([])

	const handleClose = () => {
		props.hide()        
	}

	const handleSearch = async() => {
		const param = {noticeId: noticeId}
		await getNoticeInfo(param).then(response => {		
            const check = response.data.check
            
            if(check){                
                setNoticeInfo(response.data.responseData.result)      
				setFileList(response.data.responseData.fileList)      
                
            }            
            
		}).catch((error)=>{			
			  console.log(error);
		})
	}


	const handleDownload = async(val) => {

        const param = {noticeId: noticeId , fileSeq: val }

        await getNoticeFile(param).then(res => {		
            
            const blob = new Blob([res.data])

            const fileUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = fileUrl;
            link.style.display = 'none';

            const injectFilename = (res) => {
                const disposition = res.headers['content-disposition'];

                const fileName = decodeURI(disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1].replace(/['"]/g, '')).replace('UTF-8', '');
                return fileName;
            };
            link.download = injectFilename(res);

            document.body.appendChild(link);
            link.click();
            link.remove();
                        
            
		}).catch((error)=>{			
			  console.log(error);
		})
    }

	useEffect(() => {
		handleSearch()
	},[])

	return (            
		<Modal open={show} className='modal' onClose={handleClose}>                
			<div className='noticeView'>
				<span>{noticeInfo.regDate}</span>
				<p>{noticeInfo.noticeTitle}</p>
				<div>{noticeInfo.noticeContent && <Viewer initialValue={noticeInfo.noticeContent} />}</div>
				<div>
				{fileList.length > 0 && fileList.map((list, index) => {
					return (
						<div style={{textAlign:'left', marginBottom:'10px'}}>
							<img src={list.ext.indexOf('ppt') > -1 ? PptIcon : list.ext.indexOf('xl') > -1 ? ExcelIcon : list.ext.indexOf('pdf') > -1 ? PdfIcon : list.ext.indexOf('doc') > -1 ? WordIcon : ImageIcon} />
							<span style={{marginLeft:'5px' , cursor:'pointer'}} onClick={event => handleDownload(list.fileSeq)}>{list.name+'.'+list.ext}</span>
						</div>
					)
				})}
				</div>
			</div>
		</Modal>              
	)
}