import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X, Loader2 } from 'lucide-react'
import { palette, radius, shadow, tones } from '../../lib/theme.js'

export function Button({ children, onClick, variant='primary', size='md', icon:Icon, fullWidth, disabled, type='button', className='' }) {
  const sizes = { sm:{padding:'6px 14px',fontSize:'13px',gap:'6px'}, md:{padding:'9px 20px',fontSize:'14px',gap:'8px'}, lg:{padding:'12px 28px',fontSize:'15px',gap:'10px'} }
  const variants = {
    primary:{background:palette.pine,color:'#fff',border:`1px solid ${palette.pineDark}`},
    secondary:{background:palette.sage,color:palette.pine,border:`1px solid ${palette.sageDark}`},
    ghost:{background:'transparent',color:palette.pine,border:'1px solid transparent'},
    danger:{background:'#fee2e2',color:'#991b1b',border:'1px solid #fca5a5'},
    outline:{background:'transparent',color:palette.pine,border:`1px solid ${palette.pine}`},
  }
  const v=variants[variant]??variants.primary, s=sizes[size]??sizes.md
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}
      style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:s.gap,padding:s.padding,fontSize:s.fontSize,fontFamily:'inherit',fontWeight:500,cursor:disabled?'not-allowed':'pointer',borderRadius:radius.md,transition:'all 0.15s',width:fullWidth?'100%':'auto',opacity:disabled?0.5:1,...v}}>
      {Icon && <Icon size={size==='sm'?14:size==='lg'?18:16} />}
      {children}
    </button>
  )
}

const STATUS_MAP = {
  approved:{bg:'#dcfce7',color:'#15803d',label:'Approved'},active:{bg:'#dcfce7',color:'#15803d',label:'Active'},
  completed:{bg:'#dcfce7',color:'#15803d',label:'Completed'},done:{bg:'#dcfce7',color:'#15803d',label:'Done'},pass:{bg:'#dcfce7',color:'#15803d',label:'Pass'},
  negotiation:{bg:'#fef9c3',color:'#854d0e',label:'Negotiation'},pending_payment:{bg:'#fef9c3',color:'#854d0e',label:'Pending Payment'},warning:{bg:'#fef9c3',color:'#854d0e',label:'Warning'},
  pending:{bg:'#f1f5f9',color:'#475569',label:'Pending'},todo:{bg:'#f1f5f9',color:'#475569',label:'To Do'},inactive:{bg:'#f1f5f9',color:'#475569',label:'Inactive'},
  cancelled:{bg:'#fee2e2',color:'#991b1b',label:'Cancelled'},blocked:{bg:'#fee2e2',color:'#991b1b',label:'Blocked'},fail:{bg:'#fee2e2',color:'#991b1b',label:'Fail'},
  in_progress:{bg:'#dbeafe',color:'#1d4ed8',label:'In Progress'},
}
export function StatusBadge({status,label}) {
  const cfg=STATUS_MAP[status]??{bg:'#f1f5f9',color:'#475569',label:status}
  return <span style={{background:cfg.bg,color:cfg.color,padding:'3px 10px',borderRadius:radius.pill,fontSize:'12px',fontWeight:600,whiteSpace:'nowrap',display:'inline-block'}}>{label??cfg.label}</span>
}

export function Tag({children}) {
  return <span style={{background:palette.sage,color:palette.pine,padding:'3px 10px',borderRadius:radius.pill,fontSize:'12px',fontWeight:500,display:'inline-block'}}>{children}</span>
}

const BADGE_COLORS={blue:{bg:'#dbeafe',color:'#1d4ed8'},green:{bg:'#dcfce7',color:'#15803d'},yellow:{bg:'#fef9c3',color:'#854d0e'},red:{bg:'#fee2e2',color:'#991b1b'},purple:{bg:'#f3e8ff',color:'#7e22ce'},gray:{bg:'#f1f5f9',color:'#475569'}}
export function Badge({children,color='gray'}) {
  const c=BADGE_COLORS[color]??BADGE_COLORS.gray
  return <span style={{background:c.bg,color:c.color,padding:'3px 10px',borderRadius:radius.pill,fontSize:'12px',fontWeight:500,display:'inline-block'}}>{children}</span>
}

export function SectionCard({children,title,subtitle,tone='default',action,style={}}) {
  const t=tones[tone]??tones.default
  return (
    <div style={{background:t.bg,border:`1px solid ${t.border}`,borderRadius:radius.lg,padding:'24px',boxShadow:shadow.sm,...style}}>
      {(title||action)&&<div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:title?'20px':0}}>
        <div>{title&&<h3 style={{fontSize:'15px',fontWeight:600,color:palette.charcoal}}>{title}</h3>}{subtitle&&<p style={{fontSize:'13px',color:palette.charcoalMuted,marginTop:'2px'}}>{subtitle}</p>}</div>
        {action&&<div>{action}</div>}
      </div>}
      {children}
    </div>
  )
}

export function StatCard({label,value,trend,helper,icon:Icon,tone='default'}) {
  const t=tones[tone]??tones.default
  const tUp=trend&&String(trend).startsWith('+'), tDown=trend&&String(trend).startsWith('-')
  return (
    <div style={{background:t.bg,border:`1px solid ${t.border}`,borderRadius:radius.lg,padding:'20px 24px',boxShadow:shadow.sm}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
        <div>
          <p style={{fontSize:'12px',fontWeight:500,color:palette.charcoalMuted,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>{label}</p>
          <p style={{fontSize:'28px',fontWeight:700,color:t.text??palette.charcoal,lineHeight:1}}>{value}</p>
          {trend&&<div style={{display:'flex',alignItems:'center',gap:'4px',marginTop:'6px'}}>{tUp&&<ChevronUp size={14} color="#15803d"/>}{tDown&&<ChevronDown size={14} color="#dc2626"/>}<span style={{fontSize:'12px',color:tUp?'#15803d':tDown?'#dc2626':palette.charcoalMuted}}>{trend}</span></div>}
          {helper&&<p style={{fontSize:'12px',color:palette.charcoalMuted,marginTop:'4px'}}>{helper}</p>}
        </div>
        {Icon&&<div style={{background:t.border,borderRadius:radius.md,padding:'10px'}}><Icon size={20} color={t.text??palette.pine}/></div>}
      </div>
    </div>
  )
}

export function PageHeader({title,description,actions}) {
  return (
    <div style={{background:'#fff',borderBottom:'1px solid #e5e7eb',padding:'24px 36px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
      <div>
        <h1 style={{fontSize:'22px',fontWeight:700,color:palette.charcoal}}>{title}</h1>
        {description&&<p style={{fontSize:'14px',color:palette.charcoalMuted,marginTop:'4px'}}>{description}</p>}
      </div>
      {actions&&<div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>{actions}</div>}
    </div>
  )
}

export function DataTable({columns,rows,onRowClick,emptyMessage='No data found'}) {
  if(!rows?.length) return <div style={{padding:'48px',textAlign:'center',color:palette.charcoalMuted,fontSize:'14px'}}>{emptyMessage}</div>
  return (
    <div style={{overflowX:'auto'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
        <thead><tr style={{borderBottom:'1px solid #e5e7eb'}}>
          {columns.map(col=><th key={col.key} style={{padding:'10px 16px',textAlign:col.align??'left',fontSize:'12px',fontWeight:600,color:palette.charcoalMuted,textTransform:'uppercase',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{col.label}</th>)}
        </tr></thead>
        <tbody>{rows.map((row,i)=>(
          <tr key={row.id??i} onClick={()=>onRowClick?.(row)}
            style={{borderBottom:'1px solid #f3f4f6',cursor:onRowClick?'pointer':'default',transition:'background 0.12s'}}
            onMouseEnter={e=>{if(onRowClick)e.currentTarget.style.background=palette.sage}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
            {columns.map(col=><td key={col.key} style={{padding:'12px 16px',textAlign:col.align??'left',color:palette.charcoal}}>{col.render?col.render(row[col.key],row):row[col.key]}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}

const DRAWER_WIDTHS={sm:'380px',md:'480px',lg:'580px',xl:'680px'}
export function Drawer({open,onClose,title,children,size='md'}) {
  return (
    <AnimatePresence>
      {open&&(<>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.35)',zIndex:40}}/>
        <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28,stiffness:300}}
          style={{position:'fixed',top:0,right:0,bottom:0,width:DRAWER_WIDTHS[size],background:'#fff',boxShadow:shadow.lg,zIndex:50,display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px',borderBottom:'1px solid #e5e7eb'}}>
            <h2 style={{fontSize:'17px',fontWeight:600,color:palette.charcoal}}>{title}</h2>
            <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:palette.charcoalMuted,padding:'4px'}}><X size={20}/></button>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'24px'}}>{children}</div>
        </motion.div>
      </>)}
    </AnimatePresence>
  )
}

export function Tabs({tabs,active,onChange}) {
  return (
    <div style={{display:'flex',borderBottom:'1px solid #e5e7eb'}}>
      {tabs.map(tab=>{
        const isActive=tab.id===active
        return <button key={tab.id} onClick={()=>onChange(tab.id)}
          style={{padding:'10px 20px',fontSize:'14px',fontWeight:isActive?600:400,color:isActive?palette.pine:palette.charcoalMuted,background:'none',border:'none',cursor:'pointer',borderBottom:isActive?`2px solid ${palette.pine}`:'2px solid transparent',marginBottom:'-1px',transition:'all 0.15s',fontFamily:'inherit'}}>{tab.label}</button>
      })}
    </div>
  )
}

export function TextInput({label,value,onChange,placeholder,type='text',disabled,helper}) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
      {label&&<label style={{fontSize:'13px',fontWeight:500,color:palette.charcoal}}>{label}</label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
        style={{padding:'9px 13px',fontSize:'14px',fontFamily:'inherit',border:'1px solid #d1d5db',borderRadius:radius.md,background:disabled?'#f9fafb':'#fff',color:palette.charcoal,outline:'none',transition:'border-color 0.15s'}}
        onFocus={e=>{e.target.style.borderColor=palette.pine;e.target.style.boxShadow='0 0 0 3px rgba(76,89,55,0.08)'}}
        onBlur={e=>{e.target.style.borderColor='#d1d5db';e.target.style.boxShadow='none'}}/>
      {helper&&<span style={{fontSize:'12px',color:palette.charcoalMuted}}>{helper}</span>}
    </div>
  )
}

export function Select({label,value,onChange,options,placeholder}) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
      {label&&<label style={{fontSize:'13px',fontWeight:500,color:palette.charcoal}}>{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{padding:'9px 13px',fontSize:'14px',fontFamily:'inherit',border:'1px solid #d1d5db',borderRadius:radius.md,background:'#fff',color:palette.charcoal,outline:'none',cursor:'pointer'}}>
        {placeholder&&<option value="">{placeholder}</option>}
        {options.map(o=><option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}
      </select>
    </div>
  )
}

export function InfoRow({label,value}) {
  return <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #f3f4f6'}}><span style={{fontSize:'13px',color:palette.charcoalMuted}}>{label}</span><span style={{fontSize:'14px',fontWeight:500,color:palette.charcoal}}>{value}</span></div>
}

export function LoadingSpinner({size=24,color}) {
  return <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px'}}><Loader2 size={size} color={color??palette.pine} style={{animation:'spin 1s linear infinite'}}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
}

export function EmptyState({icon:Icon,title,description,action}) {
  return (
    <div style={{textAlign:'center',padding:'64px 32px'}}>
      {Icon&&<div style={{marginBottom:'16px',color:'#d1d5db'}}><Icon size={48}/></div>}
      <h3 style={{fontSize:'16px',fontWeight:600,color:palette.charcoal,marginBottom:'8px'}}>{title}</h3>
      {description&&<p style={{fontSize:'14px',color:palette.charcoalMuted,marginBottom:'20px'}}>{description}</p>}
      {action}
    </div>
  )
}

export function Pagination({page,totalPages,onChange}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:'8px',justifyContent:'center',padding:'16px'}}>
      <button onClick={()=>onChange(page-1)} disabled={page<=1} style={{background:'none',border:'1px solid #d1d5db',borderRadius:radius.sm,padding:'6px 10px',cursor:page<=1?'not-allowed':'pointer',opacity:page<=1?0.4:1}}><ChevronLeft size={16}/></button>
      <span style={{fontSize:'13px',color:palette.charcoalMuted}}>Page {page} of {totalPages}</span>
      <button onClick={()=>onChange(page+1)} disabled={page>=totalPages} style={{background:'none',border:'1px solid #d1d5db',borderRadius:radius.sm,padding:'6px 10px',cursor:page>=totalPages?'not-allowed':'pointer',opacity:page>=totalPages?0.4:1}}><ChevronRight size={16}/></button>
    </div>
  )
}

export function FilterBar({children}) {
  return <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center',padding:'16px 0'}}>{children}</div>
}

export function ScoreMeter({score,size='md'}) {
  const dim=size==='sm'?48:size==='lg'?80:64, stroke=size==='sm'?4:size==='lg'?7:5
  const r=(dim/2)-(stroke+2), circ=2*Math.PI*r, filled=(score/100)*circ
  const color=score>=80?'#15803d':score>=60?'#d97706':'#dc2626'
  return (
    <div style={{position:'relative',width:dim,height:dim}}>
      <svg width={dim} height={dim} style={{transform:'rotate(-90deg)'}}>
        <circle cx={dim/2} cy={dim/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke}/>
        <circle cx={dim/2} cy={dim/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${filled} ${circ-filled}`} strokeLinecap="round"/>
      </svg>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <span style={{fontSize:size==='sm'?'11px':size==='lg'?'18px':'14px',fontWeight:700,color}}>{score}</span>
      </div>
    </div>
  )
}
