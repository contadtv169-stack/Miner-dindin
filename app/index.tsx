import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';

const green = '#9cff45';
export default function Home() {
  const [wallet, setWallet] = useState('');
  const [coin, setCoin] = useState('bitcoin');
  const [miner, setMiner] = useState('');
  const [busy, setBusy] = useState(false);
  const [zpool, setZpool] = useState<any>(null);
  const [kryptex, setKryptex] = useState<any>(null);
  const [status, setStatus] = useState('Pronto para consultar');
  const money = (v: any) => v == null ? '—' : String(v);
  async function refresh() {
    setBusy(true); setStatus('Consultando APIs…');
    const errors: string[] = [];
    if (wallet.trim()) {
      try { const r = await fetch('https://www.zpool.ca/api/wallet?address=' + encodeURIComponent(wallet.trim())); if (!r.ok) throw new Error(); setZpool(await r.json()); }
      catch { errors.push('ZPool: falha na consulta; confira o endereço e a API.'); }
    } else setZpool(null);
    if (miner.trim()) {
      try { const r = await fetch('https://pool.kryptex.com/' + encodeURIComponent(coin.trim()) + '/api/v1/miner/balance/' + encodeURIComponent(miner.trim())); if (!r.ok) throw new Error(); setKryptex(await r.json()); }
      catch { errors.push('Kryptex: confira a moeda e o identificador do minerador.'); }
    } else setKryptex(null);
    setBusy(false); setStatus(errors.length ? 'Consulta incompleta' : 'Consulta finalizada');
    if (errors.length) Alert.alert('Aviso', errors.join('\n'));
  }
  return <ScrollView style={s.screen} contentContainerStyle={s.content}>
    <View style={s.header}><Text style={s.pick}>⛏</Text><View><Text style={s.title}>MINER <Text style={{color:green}}>DINDIN</Text></Text><Text style={s.muted}>Painel de mineração</Text></View></View>
    <View style={s.hero}><Text style={s.label}>SALDO ZPOOL</Text><Text style={s.amount}>{money(zpool?.total ?? zpool?.balance)}</Text><Text style={s.muted}>Valor retornado pela API</Text><View style={s.sep}/><Text style={s.label}>SALDO KR YPTEX / POOL</Text><Text style={s.small}>{money(kryptex?.balance ?? kryptex?.amount ?? kryptex?.unpaid)}</Text></View>
    <Text style={s.section}>SERVIÇOS CONECTADOS</Text>
    <View style={s.card}><Text style={s.cardTitle}>ZPool.ca</Text><Text style={s.muted}>Endereço da carteira</Text><TextInput value={wallet} onChangeText={setWallet} placeholder="Cole o endereço da carteira" placeholderTextColor="#778078" autoCapitalize="none" style={s.input}/></View>
    <View style={s.card}><Text style={s.cardTitle}>Kryptex Pool</Text><Text style={s.muted}>Moeda / identificador da pool</Text><TextInput value={coin} onChangeText={setCoin} placeholder="bitcoin" placeholderTextColor="#778078" autoCapitalize="none" style={s.input}/><Text style={s.muted}>Endereço ou identificador do minerador</Text><TextInput value={miner} onChangeText={setMiner} placeholder="Identificador do minerador" placeholderTextColor="#778078" autoCapitalize="none" style={s.input}/></View>
    <Pressable style={s.button} onPress={refresh} disabled={busy}><Text style={s.buttonText}>{busy ? 'CONSULTANDO…' : '↻  ATUALIZAR SALDOS'}</Text></Pressable>
    <Text style={s.status}>{status}</Text>
    <View style={s.notice}><Text style={s.noticeTitle}>Importante</Text><Text style={s.muted}>Este aplicativo monitora saldos e não executa mineração no Android. A disponibilidade e o formato das APIs podem variar. Não cole senhas nem frases-semente de carteira.</Text></View>
    <Text style={s.footer}>MINER DINDIN • VERSÃO INICIAL</Text>
  </ScrollView>;
}
const s = StyleSheet.create({ screen:{flex:1,backgroundColor:'#080b0a'}, content:{padding:18,paddingTop:36,paddingBottom:40}, header:{flexDirection:'row',alignItems:'center',gap:12,marginBottom:24}, pick:{fontSize:26,backgroundColor:green,color:'#10160d',padding:10,borderRadius:14,overflow:'hidden'}, title:{fontSize:20,fontWeight:'900',color:'#f2f7f2',letterSpacing:1}, muted:{fontSize:12,color:'#9ba99e',marginTop:5}, hero:{backgroundColor:'#182319',borderColor:'#30462b',borderWidth:1,borderRadius:20,padding:19,marginBottom:25}, label:{fontSize:10,fontWeight:'800',color:'#a6b4a6',letterSpacing:1.2}, amount:{fontSize:29,fontWeight:'900',color:'#f4f8f2',marginTop:8}, small:{fontSize:21,fontWeight:'800',color:green,marginTop:5}, sep:{height:1,backgroundColor:'#354735',marginVertical:17}, section:{fontSize:12,fontWeight:'900',color:'#f2f7f2',letterSpacing:1.2,marginBottom:12}, card:{backgroundColor:'#121815',borderColor:'#263029',borderWidth:1,borderRadius:18,padding:15,marginBottom:13}, cardTitle:{fontSize:15,fontWeight:'800',color:'#f4f7f4',marginBottom:12}, input:{backgroundColor:'#090d0a',borderColor:'#303a32',borderWidth:1,borderRadius:11,paddingHorizontal:12,paddingVertical:12,color:'#f3f7f3',fontSize:12,marginTop:8,marginBottom:12}, button:{backgroundColor:green,borderRadius:14,padding:16,alignItems:'center',marginTop:4}, buttonText:{color:'#10160d',fontWeight:'900',fontSize:13,letterSpacing:.5}, status:{textAlign:'center',color:'#a6b4a6',fontSize:11,marginTop:12}, notice:{backgroundColor:'#171b16',borderRadius:14,padding:15,marginTop:20,borderLeftWidth:3,borderLeftColor:green}, noticeTitle:{fontSize:12,fontWeight:'900',color:green,marginBottom:7}, footer:{textAlign:'center',color:'#687269',fontSize:9,marginTop:22,letterSpacing:1} });
