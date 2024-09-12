import { useUpdateProfileManagers } from '@lens-protocol/react-web';

export function UpdateProfileManagers() {
  const { execute, loading, error } = useUpdateProfileManagers();

  const add = async () => {
    const result = await execute({
      add: ['0x01'],
    });

    if (result.isFailure()) {
      console.log(result.error.message);
    }
  };

  const remove = async () => {
    const result = await execute({
      remove: ['0x01'],
    });

    if (result.isFailure()) {
      console.log(result.error.message);
    }
  };

  return (
    <div>
      { error && <p>错误: {error.message}</p> }
      <button className='btn' onClick={add} disabled={loading}>添加</button>
      <button className='btn' onClick={remove} disabled={loading}>删除</button>
    </div>
  );
}